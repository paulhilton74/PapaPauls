let selectedPizza = ""; // Ensure selectedPizza is declared at the top

function hideSplashScreen() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

function selectPizza(pizza) {
    selectedPizza = pizza;
    document.getElementById('orderSummary').innerHTML = `Selected Pizza: ${selectedPizza}`;
}

async function placeOrder() {
    const name = document.getElementById('name').value;
    if (name === "" || selectedPizza === "") {
        alert("Please enter your name and select a pizza.");
        return;
    }

    const orderSummary = `Name: ${name}<br>Pizza: ${selectedPizza}`;
    document.getElementById('orderSummary').innerHTML = orderSummary;

    const order = {
        name: name,
        pizza: selectedPizza,
        timestamp: serverTimestamp()
    };

    try {
        const docRef = await addDoc(collection(db, "orders"), order);
        console.log("Order placed with ID: ", docRef.id);
        loadOrders();
    } catch (error) {
        console.error("Error adding order: ", error);
    }
}

function displayOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    orders.forEach(order => {
        const orderItem = document.createElement('li');
        orderItem.innerHTML = `Name: ${order.name}, Pizza: ${order.pizza}`;
        ordersList.appendChild(orderItem);
    });
}

async function loadOrders() {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = [];
    querySnapshot.forEach((doc) => {
        orders.push(doc.data());
    });
    displayOrders(orders);
}

document.addEventListener('DOMContentLoaded', loadOrders);
