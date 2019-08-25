document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('.shopping-list');
    const appForm = document.querySelector('.app-form');

    const displayItems = (doc) => {
        const item = document.createElement('li');
        const name = document.createElement('div');
        const quantity = document.createElement('div');
        const rightDiv = document.createElement('div');
        const leftDiv = document.createElement('div');
        const content = document.createElement('div');
        const btn = document.createElement('button');
    
        item.setAttribute('data-id', doc.id);
        item.setAttribute('class', 'item');
        rightDiv.setAttribute('class', 'right floated content detail-box');
        rightDiv.setAttribute('data-id', doc.id);
        leftDiv.setAttribute('class', 'left floated content detail-box');
        content.setAttribute('class', 'content detail-box');
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

    dataBase.collection('things').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type === 'added') {
                displayItems(change.doc);
                let item = document.querySelector(`[data-id="${change.doc.id}"]`);
            } else if (change.type === 'removed') {
                let item = document.querySelector(`[data-id="${change.doc.id}"]`);
                list.removeChild(item);
            } 
        });
    });

    appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        dataBase.collection('things').add({
            name: appForm.name.value,
            quantity: appForm.quantity.value
        });
        appForm.name.value = '';
        appForm.quantity.value = '';
    });
});
