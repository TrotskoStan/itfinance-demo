# IT Finance Demo

Тестовое задание для IT Finance (JavaScript / Node.js).  
**Цель:** разработать простую систему обработки клиентских заявок (лидов) на Node.js.

## 📦 Установка

Установка не требуется — достаточно иметь предустановленный **Docker** на локальной машине.

## 🚀 Запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/TrotskoStan/itfinance-demo.git
   cd itfinance-demo
   ```

2. Запустите проект:
   ```bash
   docker-compose up --build
   ```

### Что происходит при запуске:

1. Приложение собирается и запускается в Docker-контейнере на локальной машине.
2. Результаты работы скрипта записываются в директорию `output`, например:  
   `./output/log_2025-07-11 15:46:08.csv`  
   Лог-файл появится прямо в корневой папке проекта на хосте.

## ⚙️ Логика работы

1. С помощью класса `LeadGenerator.ts` скрипт создает 10,000 заявок (количество можно настроить в `index.ts` через `TOTAL_LEADS`).
2. Определяется количество одновременно обрабатываемых заявок (параметр `ASYNC_LIMIT` в `index.ts`).
3. Скрипт передаёт список заявок и лимит параллельной обработки в `LeadProcessor.ts`.
4. `LeadProcessor.ts` обрабатывает заявки с учётом ограничения и записывает успешные в лог-файл. Если обработка завершилась неудачно — ошибка выводится в консоль, но не попадает в лог.
5. Для тестирования можно изменить параметры `TOTAL_LEADS` и `ASYNC_LIMIT`, затем перезапустить приложение командой:
   ```bash
   docker-compose up --build
   ```
   Каждый запуск создаёт новый лог-файл на хосте с результатами.
6. После завершения обработки в **начало** лог-файла добавляется строка с итогом:
   ```
   Records: 10000, AsyncLimit: 34, TimeTotal: 9min 53sec
   ```
   Это позволяет оценить производительность при различных параметрах.  
   Пример лог-файла находится в `./output`.

## ⏱ Требования по времени

Согласно заданию необходимо обработать 10,000 заявок менее чем за 10 минут.  
Поскольку одна заявка обрабатывается за 2 секунды, требуется минимум 34 параллельных обработчика (`ASYNC_LIMIT = 34`), чтобы уложиться во временные рамки. Результаты работы обработчика с указанными параметрами можно посмотреть прямо на GitHub, в корне проекта в директории `output`.

## ✅ Выполнение требований задания

| Требование                                                                 | Статус                                       |
|----------------------------------------------------------------------------|----------------------------------------------|
| Node.js ≥ 18, чистый JavaScript (ES Modules)                              | ✅ Выполнено (используется Node.js v24 (ES Modules))       |
| ООП-подход (классы, интерфейсы / абстрактные классы)                      | ✅ Выполнено                                  |
| Без серверных фреймворков; разрешены небольшие npm-библиотеки (например `p-limit`) | ✅ Выполнено (используется `p-limit`)        |
| Docker (Dockerfile + docker-compose.yml), запуск одной командой          | ✅ Выполнено                                  |
| Кодстайл: ESLint + Prettier                                               | ✅ Выполнено (добавлены и настроены)          |
| Типизация: JSDoc или TypeScript                                           | ✅ Выполнено (используется TypeScript)        |
