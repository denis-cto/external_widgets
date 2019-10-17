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
Добавьте в шаблон сайта вызов скрипта для работы капчи. Вместо `_reCAPTCHA_site_key` укажите полученный первый ключ при регистрации капчи. 

```html
<script src="https://www.google.com/recaptcha/api.js?render=_reCAPTCHA_site_key"></script>
```

### 3. Установка HTML & Javascript кода виджета Mobsted
1. Скопируйте и вставьте данный код в файл `scripts/widget.js` в корне вашего сайта
```<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
				content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible"
				content="ie=edge">
	<title>Document</title>
<!--	<script src="https://dev.webpack.local:9000/cw/mbst-cw.js"></script>-->
	<script src="https://black-admin.mbst.xyz/front/dist/cw/mbst-cw.js"></script>
	<style>
		html, body {
			margin: 0;
			padding: 20px;
			font-family: Arial;
		}
		.btn {
			display: inline-block;
			padding: 20px 40px;
			border: none;
			background-color: #122b40;
			color: white;
			font-size: 18px;
			border-radius: 12px;
		}
	</style>
</head>
<body>

	<h1>Widget without params</h1>
	<button class="btn" id="showModal">Show widget</button>

	<br><br>
	<br><br>
	<hr>

	<h1>Widget with params</h1>
	<button class="btn" id="showModalWithAuth">Show widget</button>

</body>

<script>
	const CW = window.MBST.cw

  CW.config = {
	  tenant: 'lanbillingmark1',
	  server: 'moe-zkx.ru',
		applicationId: 1,
		lang: 'ru',
		alternateLogin: {
	    field: 'Login',
			alias: 'логин',
		}
	}

	const btn = document.getElementById('showModal')
	btn.addEventListener('click', e => {
	  e.preventDefault()

    CW.show()

	})

	const btnWithAuth = document.getElementById('showModalWithAuth')
  btnWithAuth.addEventListener('click', e => {
	  e.preventDefault()

    CW.show('14240')

	})
</script>
</html>


```
2. Встройте вызов виджета в основной шаблон вашего сайта
```html
<script src="scripts/widget.js"></script>
<script src="https://lanbillingmark1-admin.moe-zkx.ru/front/dist/widgets/mobsted.js"></script>
<script>
    showNotAuthLK();
</script>
```

### 4. Установка PHP кода для валидации капчи
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

### 5. Вызов виджета Mobsted при загрузке страницы или по нажатию на кнопку
Выполните следующий код в нужный момент - после загрузки страницы
```html
<script>
    showNotAuthLK();
</script>
```
Или если вы хотите навешать появление виджета на определенное событие

```html
<script>
   showWidgetToUser('vasya', 'login', 'short-link.html');
</script>
```
где `'vasya'` - имя пользователя, определенное на вашем сайте (после авторизации, например)
`'login'` - название колонки в таблице объектов в которой нужно будет искать указанное выше имя пользователя

Возможны варианты поиска логина по другим полям

```html
<script>
   showWidgetToUser('234234234234234', 'id', 'short-link.html');
</script>
```
