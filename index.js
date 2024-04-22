const $mobile_nav = document.querySelector('.mobile-nav');
const $menu_btn = document.querySelector('.bx-menu');
const $input = document.querySelector('#input-link');
const $shorten_btn = document.querySelector('#shorten_btn');

$menu_btn.addEventListener('click', toggleMenu);
$shorten_btn.addEventListener('click', shorthenLink);

async function shorthenLink() {
    const link = $input.value;
    if (link) {
        const $links_container = document.querySelector('.shorten-links-container');
        const $shortenLink = document.createElement('article');
        const apiUrl = 'https://cleanuri.com/api/v1/shorten';
        const requestBody = new URLSearchParams();
        requestBody.append('url', link);
        let data;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: requestBody,
            });
            data = await response.json();
            console.log(response);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }

        $shortenLink.innerHTML = `
        <article>
            <p>${link}</p>
            <p>${data}</p>
            <button class="copy-btn">Copy</button>
        </article>
        `
        $links_container.appendChild($shortenLink);
        $input.classList.remove('invalid');
        $input.value = "";
        const $copyBtn = $shortenLink.querySelector('.copy-btn');
        copiedLink($copyBtn);
    } else {
        $input.classList.add('invalid');
    }
}

function toggleMenu() {
    $mobile_nav.classList.toggle('show');
}

function copiedLink(btn) {
    btn.addEventListener('click', () => {
        const text = btn.previousElementSibling.innerHTML;
        copyContent(text, btn);
    });
    const copyContent = async (text, btn) => {
        try {
            await navigator.clipboard.writeText(text);
            const allBtn = document.querySelectorAll('.copy-btn');
            allBtn.forEach(btn => btn.classList.remove('copied'));
            btn.classList.add('copied');
            btn.innerText = 'Copied!';
        } catch (err) {

        }
    }
}

//todo
//short link (cors problem)