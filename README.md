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

### Регистрация капчи для сайта
Оригинал инструкции на английском языке https://github.com/google/recaptcha#direct-download

1. Зарегистрируйтесь на сайте  https://g.co/recaptcha/v3 и получите ключ

2. Если ваш сайт имеет имя mysite.ru, то пример заполнения приведен на фото:
![Снимок экрана 2019-10-08 в 12 41 21](https://user-images.githubusercontent.com/2004745/66376441-17e39580-e9c9-11e9-9556-75a334a79a3e.png)
3. Нажмите "Сохранить" и увидите окно:
![Снимок экрана 2019-10-08 в 12 42 57](https://user-images.githubusercontent.com/2004745/66376480-2fbb1980-e9c9-11e9-9bfa-f6b2e2b1010f.png)
4. В этом окне вам будет выдано 2 ключа. Один (первый) необходимо использовать в Javascript коде, второй в коде на бэкенде (на PHP).
5. Сохраните себе оба ключа.

### Установка Javascript кода капчи на сайт (инструмент для исключения отправки данных ботами)


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


