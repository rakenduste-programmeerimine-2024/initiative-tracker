// new tab default values
export const createNewTab = (id: number) => ({
  id,
  name: 'New Tab',
  active: false,
  data: {
    name: 'New Character',
    images: {
      primary: '',
      secondary: ''
    },
    stats: [
      {
        attributeName: 'New Stat',
        type: 'Number',
        value: 0
      }
    ],
    extraStats: []
  }
});