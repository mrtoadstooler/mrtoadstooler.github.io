const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
const URL = "http://mrtoadstooler.github.io/";
const SRV = "http://localhost:3100/api/";
const CART = {}

////////////////////////////////////////////////////////////////////////////////
// [RENDER]

function loadPage(name) {
    rq = new XHR();
    rq.open('GET', URL + `html/${name}.html`, true);
    rq.onload = function() {
        document.getElementById('dynamic')
            .innerHTML = rq.responseText;
    }
    rq.send();
}

////////////////////////////////////////////////////////////////////////////////
// [CART]

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
    rq = new XHR();
    rq.open('POST', SRV + 'order', true);
    rq.setRequestHeader('Content-type', 'application/json');
    rq.withCredentials = true; // authorization

    rq.onload = function(data) {
        if (this.responseText == 'OK') {
            alert('ACCEPTED!\nWe\'ve sent you an email with details.');
            document.getElementById('cart-entry')
                .innerHTML = '<i>selected products will be listed here</i>';
        } else {
            alert('DECLINED!\nSorry, some problems occured.');
        }
    }
    rq.send(JSON.stringify(CART));
}