# external_widgets
Внешние виджеты платформы Mobsted
Зарегистрируйтесь на сайте  https://g.co/recaptcha/v3 и получите ключ

Если ваш сайт имеет имя mysite.ru, то пример заполнения приведен на фото


После чего вам будет выдано 2 ключа. Один (первый) необходимо использовать в Javascript коде, второй в коде на бэкенде (на PHP например).
Сохраните себе оба ключа.
 

Инструкция на английском языке https://github.com/google/recaptcha#direct-download

На стороне бэкенда, для проверки что запросы с формы не являются запросами ботов, необходимо добавить проверку капчи

Установите зависимости через composer
```
composer require google/recaptcha "^1.2"
```
Или добавьте ее в composer.json
```
"require": {
    "google/recaptcha": "^1.2"
}
```

Либо скачайте библиотеку https://github.com/google/recaptcha/archive/master.zip
И подключите следующим образом:
```php
require_once '/path/to/recaptcha/src/autoload.php';
$recaptcha = new \ReCaptcha\ReCaptcha($secret);
```

Использование:
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


