document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('.list');
    const appForm = document.querySelector('.app-form')

    const displayItems = (doc) => {
        let item = document.createElement('li');
        let name = document.createElement('div');
        let quantity = document.createElement('div');
        let rightDiv = document.createElement('div');
        let leftDiv = document.createElement('div');
        let content = document.createElement('div');
        let btn = document.createElement('button');

        item.setAttribute('class', 'item');
        rightDiv.setAttribute('class', 'right floated content');
        rightDiv.setAttribute('data-id', doc.id);
        leftDiv.setAttribute('class', 'left floated content');
        content.setAttribute('class', 'content');
        btn.setAttribute('class', 'ui negative button');
        
        name.innerText = doc.data().name;
        quantity.innerText = doc.data().quantity;
        btn.innerText = 'Delete';

        rightDiv.appendChild(btn);
        leftDiv.appendChild(name);
        content.appendChild(quantity);
        item.appendChild(rightDiv);
        item.appendChild(leftDiv);
        item.appendChild(content);
        list.appendChild(item);

        btn.addEventListener('click', deleteItem);
    };

    const deleteItem = (e) => {
        let itemId = e.target.parentElement.getAttribute('data-id');
        dataBase.collection('things').doc(itemId).delete();
    };

    dataBase.collection('things').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            displayItems(doc);
        });
    });

    appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        dataBase.collection('things').add({
            name: appForm.name.value,
            quantity: appForm.quantity.value,
            isBought: false
        });
        appForm.name.value = '';
        appForm.quantity.value = '';
    });
});
