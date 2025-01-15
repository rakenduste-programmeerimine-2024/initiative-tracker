// new tab default values
export const createNewTab = (id: number) => ({
  id,
  name: 'New Tab',
  active: false,
  data: {
    name: 'New Character',
    images: {
      primary: ''
    },
    stats: [
      {
        attributeName: 'New Stat',
        value: 0
      }
    ],
    extraStats: []
  }
});