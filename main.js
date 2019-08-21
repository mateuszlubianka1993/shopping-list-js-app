document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('.list');

    const displayItems = (doc) => {
        let item = document.createElement('li');
        let name = document.createElement('div');
        let quantity = document.createElement('div');

        item.setAttribute('data-id', doc.id);
        
        name.innerText = doc.data().name;
        quantity.innerText = doc.data().quantity;

        item.appendChild(name);
        item.appendChild(quantity);
        list.appendChild(item);
    };

    dataBase.collection('things').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            displayItems(doc);
        });
    });
});
