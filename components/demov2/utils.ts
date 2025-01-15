// new tab default values
export const createNewTab = (id: number) => ({
  id,
  name: 'Name',
  active: false,
  data: {
    name: 'Character Name',
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