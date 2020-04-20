const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
const URL = "https://mrtoadstooler.github.io/L2/";
const SRV = "http://localhost:3100/api/v1/";
const CART = {}


function loadPage(name) {
    rq = new XHR();
    rq.open('GET', URL + `html/${name}.html`, true);
    rq.onload = function() {
        document.getElementById('dynamic')
            .innerHTML = rq.responseText;
    }
    rq.send();
}


function addToCart(i) {

    if (document.getElementById('cart-list') === null) {
        entry = document.getElementById('cart-entry');
        entry.innerHTML = '<ul id="cart-list"></ul>';
    }

    prod = document.createElement('LI');
    prod.className = 'sp' + i;
    prod.innerHTML = rs['name'];
    prod.onclick = function removeProd() {
        if (confirm(`Remove "${rs['name']}" from cart?`)) {
            CART[i] += 1;
            document.getElementById('cart-list')
                .removeChild(document.getElementsByClassName('sp' + i)[0]);
        }
    }
    document.getElementById('cart-list')
        .appendChild(prod);
}


function selectProd(i) {

    rq = new XHR();
    rq.open('GET', SRV + 'prod/' + i, true);
    rq.onload = function() {
        rs = JSON.parse(rq.responseText);

        if (parseInt(rs['qty']) + CART[i] < 1) {
            alert('Sorry, but this product is out of stock.')
        } else {
            addToCart(i);
            CART[i] = CART[i] - 1 || -1;
            alert('Added to cart!');
        }
    }
    rq.send();
}


function buySelected() {

    if (sessionStorage.user) {
        rq = new XHR();
        rq.open('POST', SRV + 'order', true);
        rq.setRequestHeader('Content-type', 'application/json');

        rq.onload = function(data) {
            if (this.responseText == 'OK') {
                alert('ACCEPTED!\nWe\'ve sent you an email with details.');
                CART = {};
                document.getElementById('cart-entry')
                    .innerHTML = '<i>selected products will be listed here</i>';
            } else {
                alert('DECLINED!\nSorry, some problems occured.');
            }
        }
        rq.send(JSON.stringify([sessionStorage.user, CART]));
    } else {
        alert('DECLINED! You should authorize first.');
    }
}
}


function login() {

    user = document.getElementById('user')
        .value;
    pass = document.getElementById('pass')
        .value;

    if (!user && !pass) {
        alert("Please, fill all fields!")
    } else {

        rq = new XHR();
        rq.open('POST', SRV + 'login', true);
        rq.setRequestHeader('Content-type', 'application/json');

        rq.onload = function(data) {
            if (this.responseText == 'OK') {
                alert(`Welcome back, ${user}!`);
                sessionStorage.setItem('user', user);
                document.getElementById('auth')
                    .innerHTML = user;
                CART = {};
                loadPage('main');
            } else if (this.responseText == 'UA') {
                if (confirm(
                        'Account does not exist!\nDo you want to sign up ?'
                    )) {
                    loadPage('signup');
                    document.getElementById('user')
                        .value = user;
                }
            } else {
                alert('Some problems occured. Try again later.');
            }
        }
        rq.send(JSON.stringify({
            'user': user,
            'pass': pass
        }));
    }
}