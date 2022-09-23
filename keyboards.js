const mainKeyboard = [
  [
    {
      text: 'Ввести расход позиции',
    }
  ],
  [
    {
      text: 'Еще',
    }  
  ]
]

const backKeyboard = [
  [
    {
      text: 'Назад',
    }
  ]
]

const moreKeyboard = [
  [
    {
      text: 'Отчет',
    }
  ],
  [
    {
      text: 'Написать пожелания',
    }
  ],
  [
    {
      text: 'Панель администратора',
    }
  ],
  [
    {
      text: 'Добавить позицию',
    },
    {
      text: 'Удалить позицию (в разработке)',
    }
  ],
  [
    {
      text: 'Назад',
    }
  ]
]

const reportKeyboard = [
  [
    {
      text: 'Месяц',
    }
  ],
  [
    {
      text: 'Сегодня',
    },
    {
      text: 'Неделя',
    }
  ],
  [
    {
      text: 'Назад',
    }
  ]
]

const adminKeyboard = [
  [
    {
      text: 'Добавить пользователя',
    }
  ],
  [
    {
      text: 'Удалить пользователя (в разработке)',
    },
  ],
  [
    {
      text: 'Ввести SQL команду вручную (в разработке)',
    },
  ],
  [
    {
      text: 'Назад',
    }
  ]
]


module.exports.keyboards = {
    mainKeyboard,
    backKeyboard,
    moreKeyboard,
    reportKeyboard,
    adminKeyboard
}