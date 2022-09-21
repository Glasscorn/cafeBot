const hello = (role = 'user') => role == 'admin' ? 'Чем могу помочь, господин?' : 'Чем могу помочь?'
const more = (role = 'user') => role == 'admin' ? 'Господин, смотрите что я могу' : 'Смотри ниже, что я могу'
const addPosition = () => 'Напиши позицию. Можно ввести несколько через запятую'
const addPositionReduce = () => 'Напиши позицию и расход (очередность не обязательна). Можно ввести несколько - вводи через запятую так:\n\nлук 100, томаты 300'

module.exports.messages = {
    hello,
    more,
    addPosition,
    addPositionReduce
}