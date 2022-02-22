
export const STATUS_COLOR_STYLE = {
  GREEN: {
    background: '#f6ffed',
    borderColor: '#b7eb8f',
    color: '#389e0d',
  },
  GEEK_BLUE: {
    background: '#f0f5ff',
    borderColor: '#adc6ff',
    color: '#1d39c4',
  },
  VOLCANO: {
    background: '#fff2e8',
    borderColor: '#ffbb96',
    color: '#d4380d'
  },
  RED: {
    background: '#ff7070',
    borderColor: '#d87aea',
    color: '#4176e0',
  }

};

export function getStyleBody(id: any): any{
  switch (id) {
    case 1:
    case 3:
      return STATUS_COLOR_STYLE.GREEN;
    case 2:
      return STATUS_COLOR_STYLE.RED;
    case false:
      return STATUS_COLOR_STYLE.RED;
    case 4:
      return STATUS_COLOR_STYLE.GEEK_BLUE;
    case 5:
      return STATUS_COLOR_STYLE.VOLCANO;
    case true:
      return STATUS_COLOR_STYLE.GREEN;
    default:
      return null;
  }
}
