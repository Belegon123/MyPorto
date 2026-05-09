const TOKEN = '8698756172:AAEuBqw4fLXaS1wTjypSxtLOeGm6aUMYFRQ';
const CHAT_ID = '7048073193';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let tema = document.querySelector('.tema');
let form = document.querySelector('.forma');

form.addEventListener('submit', submites);
tema.addEventListener('change', temat);
burger.addEventListener('click', main);

//Бургер
function main () {
    burger.classList.toggle('active');
    menu.classList.toggle('show');
}

//Измение темы сайта
function temat() {
    // Просто переключаем класс у body, а CSS сделает все остальное
    document.body.classList.toggle('dark-mode');
}

//Форма или заявка для Телеграма
function submites(e){
    e.preventDefault();
    
    // Получаем значения по id или name
    let nameVal = document.getElementById('name').value;
    let phoneVal = document.getElementById('number').value;
    let emailVal = document.getElementById('email').value;
    let commentVal = document.getElementById('comment').value;

    let message = `<b>🔥 Новая заявка с сайта!</b>\n\n`;
    message += `<b>ФИО:</b> ${nameVal}\n`;
    message += `<b>Телефон:</b> ${phoneVal}\n`;
    message += `<b>Email:</b> ${emailVal}\n`;
    message += `<b>Комментарий:</b> ${commentVal}`;

    // Меняем текст кнопки во время загрузки
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true; //выключает кнопку чтобы не тыкали по 10 раз

    fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message,
        })
    })
    .then((res) => {
        if (!res.ok) throw new Error('Ошибка HTTP: ' + res.status);
        return res.json();
    })
    .then(() => {
        alert('Ура! Сообщение успешно отправлено!');
        form.reset(); // Очищаем форму
    })
    .catch((err) => {
        console.warn(err);
        alert('Произошла ошибка при отправке.');
    })
    .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    });
}
