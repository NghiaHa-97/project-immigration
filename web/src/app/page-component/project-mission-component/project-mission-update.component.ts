import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as _ from 'lodash';

import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {
  CreateProjectMission,
  Go,
  UpdateProjectMission
} from '../../store';
import {getPrefixID} from '../../constans/prefix-id.const';

import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-project-mission-update',
  templateUrl: './project-mission-update.component.html',
  styleUrls: ['./project-mission-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMissionUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('dialogUpdate', {
    static: true
  }) dialogUpdate!: TemplateRef<any>;
  formProjectMission: FormGroup;
  initForm: any;
  entityDetail$ = new BehaviorSubject<any>(null);
  isDetail$!: Observable<boolean>;
  entityProjectMission: any;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private dialog: MatDialog) {
    this.formProjectMission = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.initForm = this.formProjectMission.value;

  }

  get description(): FormControl {
    return this.formProjectMission.get('description') as FormControl;
  }

  ngOnInit(): void {
    this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(fromStore.getProjectMissionEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)])
          );
        }
        return of(null);
      }),
      take(1)
      // map(entity => entity)
    ).subscribe(entity => {
      if (!!entity) {
        this.entityProjectMission = entity;
        this.entityDetail$.next(entity);
      }
    });

    this.isDetail$ = this.entityDetail$.pipe(
      tap(entity => {
        this.formProjectMission.patchValue({
          name: entity?.name ?? '',
          description: entity?.description ?? '',
        });
      }),
      map(entity => !!entity)
    );
    // this.store.dispatch((new LoadDetailRole(1)));
    // this.permissionsDetail$ = this.store.select(fromStore.getRoleEntitiesState)
    //   .pipe(map(entities =>
    //     entities[getPrefixID(1)]?.permissionRoles?.map((item: any) => item.permissionID) ?? [])
    //   );
  }


  onSubmit(): void {
    if (this.formProjectMission.valid) {
      if (!!this.entityProjectMission) {
        // update
        console.log('update', {
          ...this.entityProjectMission,
          ...this.formProjectMission.value
        });
        const dialogRef = this.dialog.open(this.dialogUpdate, {
          width: '20%'
        });
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.store.dispatch(
                new UpdateProjectMission({
                    ...this.entityProjectMission,
                    ...this.formProjectMission.value
                  }
                ));
            }
          });
      } else {
        // create
        console.log('create', {...this.formProjectMission.value});
        this.store.dispatch(new CreateProjectMission({...this.formProjectMission.value}));
        this.store.select(fromStore.getProjectMissionResponseStatusState).pipe(
          map(({status}) => status),
          filter(isNotNull => !!isNotNull),
          take(1)
        ).subscribe(status => {
          console.log(status);
          if (status === '200') {
            this.formProjectMission.reset(this.initForm);
          }
        });
      }
    }
  }


  back(): void {
    this.store.dispatch(new Go({path: ['nhiem-vu-cong-viec']}));
  }

  ngOnDestroy(): void {
    this.entityDetail$.complete();
  }
}
