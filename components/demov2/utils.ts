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
        attributeName: 'Health',
        value: 100
      },
      {
        attributeName: 'Strength',
        value: 75
      },
      {
        attributeName: 'Class',
        value: 'Warrior'
      }
    ],
    extraStats: [
      {
        attributeName: 'Agility',
        value: 50
      },
      {
        attributeName: 'Dexterity',
        value: 30
      },
      {
        attributeName: 'Intelligence',
        value: 20
      },
      {
        attributeName: 'Charisma',
        value: 10
      }
    ]
  }
});