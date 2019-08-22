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
        let boughtBtn = document.createElement('div');
        let boughtInput = document.createElement('input');
        let boughtLabel = document.createElement('label');

        item.setAttribute('data-id', doc.id);
        item.setAttribute('class', 'item');
        rightDiv.setAttribute('class', 'right floated content');
        rightDiv.setAttribute('data-id', doc.id);
        leftDiv.setAttribute('class', 'left floated content');
        content.setAttribute('class', 'content');
        btn.setAttribute('class', 'ui negative button');
        boughtBtn.setAttribute('class', 'right floated content ui toggle checkbox');
        boughtBtn.setAttribute('data-id', doc.id);
        boughtInput.setAttribute('type', 'checkbox');
        
        name.innerText = doc.data().name;
        quantity.innerText = doc.data().quantity;
        btn.innerText = 'Delete';
        boughtLabel.innerText = 'Bought';

        boughtBtn.appendChild(boughtInput);
        boughtBtn.appendChild(boughtLabel);
        rightDiv.appendChild(btn);
        leftDiv.appendChild(name);
        content.appendChild(quantity);
        item.appendChild(rightDiv);
        item.appendChild(leftDiv);
        item.appendChild(content);
        item.appendChild(boughtBtn);
        list.appendChild(item);

        btn.addEventListener('click', deleteItem);
        boughtBtn.addEventListener('click', isBoughtUpdate);
    };

    const deleteItem = (e) => {
        let itemId = e.target.parentElement.getAttribute('data-id');
        dataBase.collection('things').doc(itemId).delete();
    };

    const isBoughtUpdate = (e) => {
        let itemId = e.target.parentElement.getAttribute('data-id');
        
        let item = dataBase.collection('things').doc(itemId);
        item.get().then(doc => {
            dataBase.collection('things').doc(itemId).update({
                isBought: !doc.data().isBought
            });
        })
    };

    dataBase.collection('things').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added') {
                displayItems(change.doc);
            } else if (change.type == 'removed') {
                let item = document.querySelector(`[data-id="${change.doc.id}"]`);
                list.removeChild(item);
            }
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
