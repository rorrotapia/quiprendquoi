if (navigator.clipboard) {
    document.querySelectorAll('[data-clipboard]').forEach(($clipboardEl) => {
        const $button = document.createElement('button');
        $button.innerHTML = 'Copié !';
        setTimeout(() => ($button.innerHTML = 'Copier'), 2000);
        $clipboardEl.parentNode.append($button);
        $button.addEventListener(
            'click',
            copyToClipboard.bind(this, $clipboardEl, $button)
        );
    });
} else {
    console.warn("Pas de support")
}

if (navigator.share) {
    document.querySelectorAll('[data-share-url]').forEach(($shareEl) => {
        const $button = document.createElement('button');
        $button.innerHTML = 'Partager';
        $shareEl.parentNode.append($button);

        $button.addEventListener('click', share.bind(this, $shareEl));
    });
}

function share($shareEl) {
    navigator.share({
        title: $shareEl.getAttribute('data-share-title'),
        text: $shareEl.getAttribute('data-share-text'),
        url: $shareEl.getAttribute('data-share-url'),
    });
}


function copyToClipboard($clipboardEl, $button) {
    navigator.clipboard
        .writeText($clipboardEl.getAttribute('data-clipboard'))
        .then(() => {
            console.log('Copié !');
        })
        .catch((err) => console.warn(err));
}