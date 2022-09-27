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

const moreKeyboardUser = [
  [
    {
      text: 'Отчет',
    }
  ],
  [
    {
      text: 'Смотреть позиции',
    }
  ],
  [
    {
      text: 'Написать пожелания',
    }
  ],
  [
    {
      text: 'Добавить позицию',
    },
    {
      text: 'Удалить позицию',
    }
  ],
  [
    {
      text: 'Назад',
    }
  ]
]

const moreKeyboardAdmin = [
  [
    {
      text: 'Отчет',
    }
  ],
  [
    {
      text: 'Смотреть позиции',
    }
  ],
  [
    {
      text: 'Добавить позицию',
    },
    {
      text: 'Удалить позицию',
    }
  ],
  [
    {
      text: 'Панель администратора',
    }
  ],
  [
    {
      text: 'Написать пожелания',
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
      text: 'Изменить роль пользователя',
    }
  ],
  [
    {
      text: 'Добавить пользователя',
    }
  ],
  [
    {
      text: 'Удалить пользователя',
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
    moreKeyboardUser,
    moreKeyboardAdmin,
    reportKeyboard,
    adminKeyboard
}