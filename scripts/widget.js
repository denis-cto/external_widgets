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

// TODO выполнять запросы вместо фиктивных проверок  = 123
const http = (url, method, params) => {
  // TODO получить api ключ для работы с капчой
  grecaptcha.ready(function () {
    grecaptcha.execute('_reCAPTCHA_site_key_', { action: 'homepage' })
      .then(function (token) {
        // make your http request
      });
  });
};

const isWidgetShown = false; //localStorage.getItem("isWidgetShown"); TODO пока убрано, чтобы норм дебажить, потом вернуть
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
          debug: false,
          external: true,
          tenant: 'lanbillingmark1',
          server: 'moe-zkx.ru',
          lang: 'ru',
          applicationId: 1,
          objectId: objectId,
          screenId: 812,
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
