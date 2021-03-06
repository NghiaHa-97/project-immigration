import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {combineLatest, Observable} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-tree-checkbox',
  templateUrl: './tree-checkbox.component.html',
  styleUrls: ['./tree-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeCheckboxComponent implements OnInit {
  @Input() checklistSelection!: SelectionModel<TodoItemFlatNode>;
  @Input() data!: Observable<TodoItemNode[]>;
  @Input() initSelected!: Observable<number[]>;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  flatNodeMapLevelOneByID = new Map<number, TodoItemFlatNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    // nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  nestedNodeMap = new Map<number, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
    // newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  // checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);


  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  }

  ngOnInit(): void {

    combineLatest([this.data, this.initSelected])
      .subscribe(([data, arrayIdInit]) => {
        this.dataSource.data = data;
        if (data.length === 0) {
          return;
        }
        setTimeout(() => {
          arrayIdInit.forEach(value => {
            const item = this.flatNodeMapLevelOneByID.get(value) ?? null;
            if (item !== null && !this.checklistSelection.isSelected(item)) {
              this.todoItemSelectionToggle(item);
              // this.checklistSelection.toggle(item);
            }
          });
          this.changeDetectorRef.detectChanges();
        });
      });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, nodeData: TodoItemFlatNode) => nodeData.expandable;

  // hasNoContent = (_: number, nodeData: TodoItemFlatNode) => nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node.code);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.id = node.id;
    flatNode.code = node.code;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node.code, flatNode);
    if (level === 1) {
      this.flatNodeMapLevelOneByID.set(node.id, flatNode);
    }
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    // descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);

    // console.log(node);
    // console.log(this.checklistSelection.selected);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  // addNewItem(node: TodoItemFlatNode): void {
  //   const parentNode = this.flatNodeMap.get(node);
  //   if (parentNode) {
  //     this.database.insertItem(parentNode, '');
  //     this.treeControl.expand(node);
  //   }
  // }

  /** Save the node to database */
  // saveNode(node: TodoItemFlatNode, itemValue: string): void {
  //   const nestedNode = this.flatNodeMap.get(node);
  //   if (nestedNode) {
  //     this.database.updateItem(nestedNode, itemValue);
  //   }
  // }

  checkAll(): void {
    const it = this.flatNodeMap.keys();
    let result = it.next();
    while (!result.done) {
      if (!this.checklistSelection.isSelected(result.value)) {
        this.checklistSelection.select(result.value);
      }
      result = it.next();
    }
  }

  uncheckAll(): void {
    this.checklistSelection.clear();
  }
}


/**
 * Node for to-do item
 */
export class TodoItemNode {
  children!: TodoItemNode[];
  item!: string;
  code!: number;
  id!: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  id!: number;
  item!: string;
  code!: number;
  level!: number;
  expandable!: boolean;
}

/** build tree node response Module */
export function buildFileTreeModule(obj: { [key: string]: any }, level: number): TodoItemNode[] {
  return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
    const value = obj[key];
    const node = new TodoItemNode();
    node.id = value?.id;
    node.item = value?.name;
    node.code = value?.code;
    if (value?.permissions) {
      node.children = buildFileTreeModule(value?.permissions, level + 1);
    }
    return accumulator.concat(node);
  }, []);
}


/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
// @Injectable()
// export class ChecklistDatabase {
//   dataChange = new BehaviorSubject<TodoItemNode[]>([]);
//
//   get data(): TodoItemNode[] {
//     return this.dataChange.value;
//   }
//
//   constructor() {
//     this.initialize();
//   }
//
//   initialize(): void {
//     // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
//     //     file node as children.
//     const data = this.buildFileTree(TREE_DATA, 0);
//     // const data1 = buildFileTreeModule(TREE_DATA_1, 0);
//
//     // Notify the change.
//     this.dataChange.next(data);
//   }
//
//   /**
//    * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
//    * The return value is the list of `TodoItemNode`.
//    */
//   // buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
//   //   return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
//   //     const value = obj[key];
//   //     const node = new TodoItemNode();
//   //     node.item = key;
//   //
//   //     if (value != null) {
//   //       if (typeof value === 'object') {
//   //         node.children = this.buildFileTree(value, level + 1);
//   //       } else {
//   //         node.item = value;
//   //       }
//   //     }
//   //
//   //     return accumulator.concat(node);
//   //   }, []);
//   // }
//
//   buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
//     console.log(Object.keys(obj));
//     return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
//       const value = obj[key];
//       const node = new TodoItemNode();
//       node.item = value?.name;
//       node.code = value?.code;
//       if (value?.children) {
//           node.children = this.buildFileTree(value?.children, level + 1);
//       }
//       return accumulator.concat(node);
//     }, []);
//   }
//
//   /** Add an item to to-do list */
//   // insertItem(parent: TodoItemNode, name: string): void {
//   //   if (parent.children) {
//   //     parent.children.push({item: name} as TodoItemNode);
//   //     this.dataChange.next(this.data);
//   //   }
//   // }
//
//   // updateItem(node: TodoItemNode, name: string): void {
//   //   node.item = name;
//   //   this.dataChange.next(this.data);
//   // }
// }


/**
 * The Json object for to-do list data.
 */
// const TREE_DATA = {
//   Module1: {
//     code: 1,
//     name: 'module-1',
//     children: [
//       {
//         code: 10,
//         name: 'Xem'
//       },
//       {
//         code: 11,
//         name: 'Th??m',
//       },
//       {
//         code: 12,
//         name: 'S???a',
//       },
//       {
//         code: 13,
//         name: 'S???a',
//       }
//     ]
//   },
//   Module2: {
//     code: 2,
//     name: 'module-2',
//     children: [
//       {
//         code: 20,
//         name: 'Xem'
//       },
//       {
//         code: 21,
//         name: 'Th??m',
//       },
//       {
//         code: 22,
//         name: 'S???a',
//       },
//       {
//         code: 23,
//         name: 'X??a',
//       }
//     ]
//   }
// };





