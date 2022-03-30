/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(tag);
        el.innerHTML = content;
        document.body.insertAdjacentElement('beforeend', el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    if (!document.body.firstChild) {
        const elM = document.createElement('div');
        let s = 'item_' + (level - 1);
        elM.className = s;
        document.body.insertAdjacentElement('beforeend', elM);
        s = 'item_' + level;
        const el = document.createElement('div');
        el.className = s;
        elM.insertAdjacentElement('beforeend', el);
        return generateTree(childrenCount, level - 1);
    } else {
        let preds = document.body.firstChild;
        let node = preds.firstChild;
        for (let i = 0; i < childrenCount - 1; i++) {
            const el = node.cloneNode(true);
            preds.appendChild(el);
        }
        if (level == 1) {
            return document.body.firstChild;
        }
        const elM = document.createElement('div');
        let s = 'item_' + (level - 1);
        elM.className = s;
        document.body.insertAdjacentElement('afterbegin', elM);
        elM.appendChild(preds);
        return generateTree(childrenCount, level - 1);
    }
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let childrenCount = 2;
    let level = 3;
    generateTree(childrenCount, level);
    for (let i = 0; i < childrenCount; i++) {
        let el = document.body.getElementsByClassName('item_2')[i];
        var elNew = document.createElement('section');
        elNew.innerHTML = el.innerHTML;

        Array.prototype.forEach.call(el.attributes, function (attr) {
            elNew.setAttribute(attr.name, attr.value);
        });

        el.parentNode.insertBefore(elNew, el);
        el.parentNode.removeChild(el);
    }
    return document.body.firstChild;
}
