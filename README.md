# external_widgets
Внешние виджеты платформы Mobsted

## Общий принцип работы
![2019-10-08 12 46 20](https://user-images.githubusercontent.com/2004745/66376725-b2dc6f80-e9c9-11e9-8d0e-9b0a767489af.jpg)

## Установка виджета на сайт компании
Установка виджета состоит из нескольких шагов:
1. Регистрация капчи для сайта
2. Установка Javascript кода капчи на сайт (инструмент для исключения отправки данных ботами)
3. Установка HTML & Javascript кода виджета Mobsted
4. Установка PHP кода для валидации капчи
5. Вызов виджета Mobsted при загрузке страницы или по нажатию на кнопку

### 1. Регистрация капчи для сайта
Оригинал инструкции на английском языке https://github.com/google/recaptcha#direct-download

1. Зарегистрируйтесь на сайте  https://g.co/recaptcha/v3 и получите ключ

2. Если ваш сайт имеет имя mysite.ru, то пример заполнения приведен на фото:
![Снимок экрана 2019-10-08 в 12 41 21](https://user-images.githubusercontent.com/2004745/66376441-17e39580-e9c9-11e9-9556-75a334a79a3e.png)
3. Нажмите "Сохранить" и увидите окно:
![Снимок экрана 2019-10-08 в 12 42 57](https://user-images.githubusercontent.com/2004745/66376480-2fbb1980-e9c9-11e9-9bfa-f6b2e2b1010f.png)
4. В этом окне вам будет выдано 2 ключа. Один (первый) необходимо использовать в Javascript коде, второй в коде на бэкенде (на PHP).
5. Сохраните себе оба ключа.

### 2. Установка Javascript кода капчи на сайт (инструмент для исключения отправки данных ботами)


1. На стороне бэкенда, для проверки что запросы с формы не являются запросами ботов, необходимо добавить проверку капчи

1.a Установите зависимости через `composer`. Выполните команду 
```bash
# composer require google/recaptcha "^1.2"
```
Или добавьте ее в файл `composer.json`
```
"require": {
    "google/recaptcha": "^1.2"
}
```

1.b Либо скачайте библиотеку `https://github.com/google/recaptcha/archive/master.zip`
И подключите следующим образом:
```php
require_once '/path/to/recaptcha/src/autoload.php';
$recaptcha = new \ReCaptcha\ReCaptcha($secret);
```
где `$secret` - второй из ключей выданный после регистрации капчи

2. Использование:
```php
<?php
$recaptcha = new \ReCaptcha\ReCaptcha($secret); 
$resp = $recaptcha->setExpectedHostname(‘mysite.ru’) // укажите домен вашего сайта
                  ->verify($gRecaptchaResponse, $remoteIp);
if ($resp->isSuccess()) {
    // В это место программа попадет когда капча верно проверена!
} else {
    $errors = $resp->getErrorCodes();
}
```

### 3. Установка HTML & Javascript кода виджета Mobsted
1. Скопируйте и вставьте данный код в страницу вашего сайта
```javascript
const wrapper = document.createElement('div');
wrapper.innerHTML = `<div id="mobsted-modal">
        <div id="mobsted-modal-content">
            <header id="mobsted-modal-header">
                <span id="mobsted-modal-close">x</span>
                <span id="mobsted-modal-header-text">Добавить приложение</span>

            </header>
            <h1 id="mobsted-modal-info-message">Вы можете добавить приложение на домашний экран мобильного устройства</h1>
            <div id="mobsted-modal-body">
                <form id="mobsted-form" onsubmit="return false;">
                    <span id="mobsted-form-phone">
                        <label for="mobsted-phone">Телефон</label>
                        <input type="tel" id="mobsted-phone" name="phone" required/>
                    </span>
                    <span id="mobsted-form-login">
                        <label for="mobsted-login">Логин</label>
                        <input type="text" id="mobsted-login" name="login" required/>
                    </span>
                    <div id="mobsted-modal-buttons">
                        <button id="mobsted-submit-button">Добавить</button>
                    </div>
                </form>
                <h1 id="mobsted-modal-success-message">Спасибо! На ваш телефон было отправлено приглашение в мобильное приложение</h1>
                <h1 id="mobsted-modal-fail-message">Ваш номер телефона или логин не найден. Пожалуйста, войдите в личный кабинет или позвоните по номеру 8988888888</h1>
            </div>
        </div>
    </div>`;

const styles = document.createElement('style');
styles.innerHTML = `#mobsted-modal {
    display: none;
    padding-top: 30%;
    z-index: 3;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
#mobsted-modal-content {
    font-family: 'Source Sans Pro', sans-serif;
    color: #444;
    font-weight: 300;
    line-height: 1.5;
    padding: 15px 20px;
    font-size: 16px;
    border: none;
    border-radius: 3px;
    margin: auto;
    position: relative;
    box-shadow: 0 0.875em 1.75em rgba(0,0,0,0.25), 0 0.625em 0.625em rgba(0,0,0,0.22);
    background-color: #fff;
    width: 300px;
    outline: 0;
}
#mobsted-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
#mobsted-form input{
    outline: none;
    display: block;
    width: 100%;
    border: 0;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px 20px;
    height: 35px;
    transition: 0.3s ease;
    background: #d7dbe26b;
    color: #444;
}
#mobsted-form-phone,
#mobsted-form-login {
    width: 100%;
}
#mobsted-form-phone,
#mobsted-form-login {
    display: none;
}
#mobsted-modal-header {
    font-size: 1.375em;
    margin-bottom: 10px;
}
#mobsted-modal-buttons {
    display: block;
    width: 100%;
}
#mobsted-modal-buttons button {
    border: 0;
    border-radius: 4px;
    color: white;
    padding: 8px;
    font-size: inherit;
    font-weight: inherit;
    float: right;
    margin-top: 10px;
    margin-left: 10px;
}
#mobsted-submit-button {
    display: inline-block;
    background: #428bca;
    width: 100px;
}
#mobsted-modal-info-message,
#mobsted-modal-fail-message,
#mobsted-modal-success-message {
    font-size: inherit;
    font-weight: inherit;
    display: none;
}

#mobsted-modal-success-message {
    color: #3ec61e;
}
#mobsted-modal-fail-message {
    color: #428bca;
}
#mobsted-modal-close {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;
    padding: 8px 16px;
    border: none;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    background-color: inherit;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
}
#mobsted-modal-close:hover {
    color: #000!important;
    background-color: #d7dbe26b!important;
}
@media (min-width: 10px) and (max-width: 400px) {
    #mobsted-modal-content {
        margin: 0 10px;
        width: auto!important;
    }
}
@media (min-width: 400px) {
    #mobsted-modal-content {
        width: 300px!important;
    }
}`;

document.body.appendChild(wrapper);

document.head.appendChild(styles);

const showTag = (tagId, display = 'block') => {
  const tag = document.getElementById(tagId);
  tag.style.display = display;
};
const hideTag = (tagId) => {
  const tag = document.getElementById(tagId);
  tag.style.display = 'none';
};


const http = (url, method, params) => {
  // TODO получить api ключ для работы с капчой
  grecaptcha.ready(function () {
    grecaptcha.execute('_reCAPTCHA_site_key_', { action: 'homepage' })
      .then(function (token) {
        // make your http request
      });
  });
};

const isWidgetShown = false; 
let isMobile = false;
if (/iPad|iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
}

document.getElementById('mobsted-modal-close')
  .addEventListener('click', () => {
    hideTag('mobsted-modal');
  });


function showNotAuthLK() {
  if (!isWidgetShown) {
    localStorage.setItem('isWidgetShown', true);
    showTag('mobsted-modal');
    if (isMobile) {
      const failMessageTag = document.getElementById('mobsted-modal-fail-message');
      failMessageTag.innerText = 'Ваш логин не найден. Пожалуйста, войдите в личный кабинет или позвоните по номеру 8988888888'; //TODO узнать норм телефон
      showTag('mobsted-form-login');
      document.getElementById('mobsted-submit-button')
        .addEventListener('click', () => {
          const loginTag = document.getElementById('mobsted-login');

          const login = loginTag.value;

          if (login) {
            let result = login === '123';
            if (result) {
              document.location = 'some-short-link.html';
            } else {
              showTag('mobsted-modal-fail-message');
            }
          }
        });
    } else {
      const loginTag = document.getElementById('mobsted-login');
      const headerTag = document.getElementById('mobsted-modal-header-text');
      const buttonSubmitTag = document.getElementById('mobsted-submit-button');
      headerTag.innerText = 'Получить приложение';
      buttonSubmitTag.innerText = 'Получить';
      loginTag.oninvalid = function (e) {
        if (!e.target.validity.valid) {
          e.target.setCustomValidity('Пользователя с таким номером не существует, пожалуйста, введите логин');
        }
      };
      loginTag.oninput = function (e) {
        e.target.setCustomValidity('');
      };
      showTag('mobsted-form-phone');
      buttonSubmitTag.addEventListener('click', () => {
        const phoneTag = document.getElementById('mobsted-phone');
        const phone = phoneTag.value;
        const login = loginTag.value;

        hideTag('mobsted-modal-success-message');
        hideTag('mobsted-modal-fail-message');
        if (phone) {
          let result = phone === '123';
          if (!result && login) {
            result = login === '123';
          }
          if (result) {
            showTag('mobsted-modal-success-message');
            hideTag('mobsted-form');
          } else {
            if (!login) {
              showTag('mobsted-form-login');
            } else {
              showTag('mobsted-modal-fail-message');
            }
          }
        }
      });
    }
  }

}


function showWidgetToUser(login, uid, shortLink) {
  if (isMobile) {
    if (!isWidgetShown) {
      localStorage.setItem('isWidgetShown', true);
      showTag('mobsted-modal');
      showTag('mobsted-modal-info-message');

      document.getElementById('mobsted-submit-button')
        .addEventListener('click', () => {
          document.location = `${shortLink}?uid=${uid}`;
        });
    }
  } else {
    window.mobsted.getObjectId({
      userCredentials: [{ field: 'Login', operation: '=', value: login }],
      serviceObject: 1,
      tenant: 'lanbillingmark1',
      server: 'moe-zkx.ru',
      applicationId: 1,
    })
      .then((objectId) => {
        window.mobsted.init({
          debug: false,  // отладка отключена
          external: true, // указание на то что это внешний виджет
          tenant: 'lanbillingmark1', // имя тенанта
          server: 'moe-zkx.ru', // адрес сервера
          lang: 'ru', //язык русский
          applicationId: 1, // ID приложения
          objectId: objectId,
          screenId: 812, //  ID стартового экрана
        })
          .then(cnf => {
            window.mobsted.widgets.bots.show();
          })
          .catch(e => {
            console.warn('Ошибка инициализации виджета', e);
          });
      })
      .catch(e => {
        console.warn('Ошибка получения объекта для виджета', e);
      });

  }
}

```
