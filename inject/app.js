/**
 * Z.ai Desktop — пользовательский скрипт интерфейса
 * Русская локализация + скрытие системной навигации сайта
 *
 * Словарь основан на открытом проекте «Русский интерфейс z.ai»
 * (лицензия MIT, greasyfork.org/ru/scripts/554969) и дополнен для
 * десктопного приложения. Перевод применяется к статическим элементам
 * интерфейса по точному совпадению; сообщения чата и ввод пользователя
 * не переводятся.
 */
(function () {
  'use strict';

  // ==========================================
  // НАСТРОЙКИ АВТОПЕРЕВОДА
  // ==========================================
  // 1) ОНЛАЙН-ПЕРЕВОДЧИК: строки интерфейса, которых нет в словаре,
  //    автоматически переводятся бесплатным онлайн-сервисом и запоминаются
  //    навсегда (localStorage). Отключить: false вместо true.
  var AUTO_TRANSLATE_ONLINE = true;
  // 2) УДАЛЁННЫЙ СЛОВАРЬ: файл inject/dictionary.json из вашего репозитория
  //    подтягивается при каждом запуске. Новые переводы добавляются БЕЗ
  //    пересборки приложения — дополните файл на GitHub и перезапустите.
  //    '__REMOTE_DICT_REPO__' автоматически заменяется на адрес вашего
  //    репозитория при сборке (это делает scripts/patch-pake-ru.js).
  var REMOTE_DICT_REPO = '__REMOTE_DICT_REPO__';

  // ==========================================
  // СЛОВАРЬ ЛОКАЛИЗАЦИИ (EN -> RU)
  // ==========================================
  // Основа: проект «Русский интерфейс z.ai» (MIT, greasyfork.org/scripts/554969),
  // дополнен и адаптирован для десктопного приложения Z.ai Desktop.
  var DICT = {
  // --- Дополнение 30.10.2026: строки нового интерфейса Z.ai ---
  'Home': 'Главная',
  'Scheduled': 'Расписание',
  'Cloud': 'Облако',
  'Recents': 'Недавние',
  'Send a Message': 'Отправить сообщение',
  'Send a message': 'Отправить сообщение',
  'Connect IM': 'Подключить мессенджер',
  'Starting with a case': 'Начните с готового сценария',
  'Create via chat': 'Создать через чат',
  'Library': 'Библиотека',
  'Plugins': 'Плагины',
  'Project name': 'Название проекта',
  'Project Name': 'Название проекта',
  'Give your project a name': 'Придумайте название проекта',
  // --- Конец дополнения ---
  // --- Дополнение 30.10.2026 №2: файлы, «Облако», статусы, кнопки, сценарии ---
  'Attachment': 'Вложение',
  'Add file': 'Добавить файл',
  'Add files': 'Добавить файлы',
  'Drop files here': 'Перетащите файлы сюда',
  'Max file size': 'Максимальный размер файла',
  'Unsupported file': 'Неподдерживаемый файл',
  'Unsupported file type': 'Неподдерживаемый тип файла',
  'Import from': 'Импорт из',
  'Search files': 'Поиск файлов',
  'No files yet': 'Пока нет файлов',
  'My Files': 'Мои файлы',
  'Select': 'Выбрать',
  'Preview': 'Просмотр',
  'Move': 'Переместить',
  'Sort by': 'Сортировка',
  'Date': 'Дата',
  'OK': 'ОК',
  'Apply': 'Применить',
  'Reset': 'Сбросить',
  'Clear': 'Очистить',
  'Clear all': 'Очистить всё',
  'Previous': 'Назад',
  'Remove': 'Удалить',
  'Replace': 'Заменить',
  'Uploading': 'Загрузка...',
  'Processing': 'Обработка',
  'Queued': 'В очереди',
  'Pending': 'Ожидание',
  'In progress': 'В процессе',
  'Completed': 'Завершено',
  'Success': 'Готово',
  'Failed': 'Не удалось',
  'Draft': 'Черновик',
  'See all': 'Показать все',
  'Load more': 'Загрузить ещё',
  'More...': 'Ещё...',
  'This week': 'На этой неделе',
  'Last week': 'На прошлой неделе',
  'This month': 'В этом месяце',
  'Knowledge Base': 'База знаний',
  'Agent name': 'Имя агента',
  'Rename chat': 'Переименовать чат',
  'Pin chat': 'Закрепить чат',
  'Unpin chat': 'Открепить чат',
  'Publish': 'Опубликовать',
  'Unpublish': 'Отменить публикацию',
  'Unarchive': 'Разархивировать',
  'Favorite': 'Избранное',
  'Add favorite': 'В избранное',
  'Sync': 'Синхронизировать',
  'Syncing': 'Синхронизация',
  'Remaining credits': 'Осталось кредитов',
  'Credits remaining': 'Осталось кредитов',
  'Fair use': 'Разумное использование',
  'Getting started': 'Начало работы',
  'What can I help with?': 'Чем могу помочь?',
  'Type a message': 'Введите сообщение',
  'Type your message': 'Введите сообщение',
  'Shift + Enter for new line': 'Shift + Enter — новая строка',
  'Free plan': 'Бесплатный план',
  'Pro plan': 'План Pro',
  // Карточки сценариев на странице «Расписание» (новые строки)
  'Compare this week\'s pricing and plan changes of leading AI products': 'Сравнение цен и изменений тарифов ведущих ИИ-продуктов за эту неделю',
  'Draft a ready-to-paste weekly report from this week\'s chats': 'Готовый для вставки еженедельный отчёт из чатов этой недели',
  'Plugin & connection health checks': 'Проверка плагинов и подключений',
  // --- Конец дополнения №2 ---
  '- 3 remaining today': '- Осталось 3 на сегодня',
  '@New agent': '@Новый агент',
  '*Subject to fair use': '*При условии разумного использования',
  '$19 / month': '$19 в месяц',
  '$199 / month': '$199 в месяц',
  '$39 / month': '$39 в месяц',
  '10x Moderato K2 Turbo model usage quota': 'В 10 раз больше лимита использования модели K2 Turbo (по сравнению с Модерато)',
  '10x Moderato OK Computer quota': 'В 10 раз больше лимита для OK Computer (по сравнению с Модерато)',
  '10x Moderato Researcher quota': 'В 10 раз больше лимита для Researcher (по сравнению с Модерато)',
  '10x speed': 'скорость х10',
  '10x Speed': 'Скорость 10x',
  '2x Moderato K2 Turbo model usage quota': 'В 2 раза больше лимита использования модели K2 Turbo (по сравнению с Модерато)',
  '2x Moderato OK Computer quota': 'В 2 раза больше лимита для OK Computer (по сравнению с Модерато)',
  '2x Moderato Researcher & OK Computer multi-tasking': 'В 2 раза больше возможностей для одновременной работы Researcher и OK Computer (по сравнению с Модерато)',
  '2x Moderato Researcher quota': 'В 2 раза больше лимита для Researcher (по сравнению с Модерато)',
  'About': 'О программе',
  'Access': 'Доступ',
  'Access and manage payments, customers, and transactions in Stripe.': 'Доступ и управление платежами, клиентами и транзакциями в Stripe.',
  'Access contacts, campaigns, and insights from your Brevo account.': 'Получите доступ к контактам, кампаниям и аналитике из вашего аккаунта Брево.',
  'Access customer chats, support data, and automate responses with Intercom.': 'Получите доступ к чатам с клиентами, данным поддержки и автоматизируйте ответы с помощью Intercom.',
  'Access frontier AI models': 'Доступ к передовым ИИ‑моделям',
  'Access merchant, payments, and transaction data in Square.': 'Получите доступ к данным продавцов, платежей и транзакций в Square.',
  'Access to flash answers': 'Доступ к быстрым ответам',
  'Access to the latest frontier models from Mistral AI': 'Доступ к последним передовым моделям от Мистраль ИИ',
  'Access to web browsing, breaking news, file uploads and advanced data analysis': 'Доступ к веб-серфингу, последним новостям, загрузке файлов и расширенному анализу данных',
  'Access without paying. API requests may be used to train our models.': 'Доступ без оплаты. Запросы к API могут использоваться для обучения наших моделей.',
  'Account': 'Аккаунт',
  'Account deletion': 'Удаление аккаунта',
  'Account settings': 'Настройки аккаунта',
  'Active': 'Активные',
  'Add': 'Добавить',
  'Add billing informations': 'Добавить платежную информацию',
  'Add Connector': 'Добавить подключение',
  'Add credits': 'Добавить кредиты',
  'Add Demonstration (Input/Output)': 'Добавить демонстрацию (вход/выход)',
  'Add details based on the original text': 'Добавить детали на основе исходного текста',
  'Add guardrails': 'Добавить ограничительные правила (стратегии безопасности)',
  'Add Tags': 'Добавить тэги',
  'Adjust tone': 'Настроить тон общения',
  'Admin Controls': 'Административные настройки',
  'Administration': 'Администрирование',
  'Ads/Posters/PR': 'Реклама/плакаты/PR',
  'Advanced': 'Дополнительно',
  'Advanced visual understanding and analysis': 'Углублённое визуальное понимание и анализ',
  'Agent': 'Агент',
  'Agents': 'Агенты',
  'Agents - Connectors': 'Агенты - Коннект',
  'AI Slides': 'Презентации с помощью ИИ',
  'All': 'Все',
  'All Chats': 'Все чаты',
  'All the invoices of your different subscriptions.': 'Все счета ваших различных подписок.',
  'Allegretto': 'Аллегретто',
  'Allow Le Chat to use your location to provide more relevant responses': 'Разрешить Ле-Чат использовать ваше местоположение для предоставления более релевантных ответов',
  'Allow your API calls to be used to train our models.': 'Разрешить использовать ваши вызовы API для обучения наших моделей.',
  'Allow your interactions to be used to train our models.': 'Разрешить использовать ваши взаимодействия для обучения наших моделей.',
  'Already have an account?': 'Уже есть аккаунт?',
  'Always on standby in your community.': 'Всегда будьте наготове в вашем сообществе.',
  'Analyze Nvidia price moves around earnings and test pre/post‑earnings strategy': 'Проанализировать динамику цен Nvidia в период отчётов о доходах и протестировать стратегию до/после публикации отчётов',
  'Anonymous improvement data': 'Анонимизированные данные для улучшения',
  'API Key': 'Ключ API',
  'API Keys': 'Ключи API',
  'API Requests': 'Запросы к API',
  'API requests may be used to train our models.': 'Запросы к API могут использоваться для обучения наших моделей.',
  'API usage for': 'Использование API на',
  'Appearance': 'Внешний вид',
  'Archive': 'Архивировать',
  'Archive All Chats': 'Архивировать все чаты',
  'Archived': 'Архивные',
  'Archived chats': 'Архивные чаты',
  'Archived Chats': 'Архивированные чаты',
  'Are you a student?': 'Вы студент?',
  'Article optimization': 'Оптимизация статей',
  'As an admin of this organization, you can view and manage all API keys in this organization.': 'Как администратор этой организации, вы можете просматривать и управлять всеми ключами API в этой организации.',
  'Asana': 'Асана',
  'Ask anything': 'Спросите о чём угодно',
  'Ask Anything.': 'Задайте любой вопрос.',
  'Ask anything…': 'Задайте любой вопрос…',
  'Ask Anything...': 'Спрашивай о чём угодно',
  'Ask me about my': 'Спроси меня о',
  'Ask me about my career': 'Спросите меня о моей карьере',
  'Ask me about my favorites': 'Спросите меня о моих любимых вещах',
  'Ask me about my travel experiences': 'Спросите меня о моем опыте путешествий',
  'Attach': 'Прикрепить',
  'Audio': 'Аудио',
  'Author': 'Автор',
  'Auto': 'Авто',
  'Auto-adapt to needs, deeply analyze complex issues automatically.': 'Автоматическая адаптация к потребностям, глубокий анализ сложных вопросов в автоматическом режиме.',
  'Auto-Copy Response to Clipboard': 'Автокопирование ответа в буфер обмена',
  'Based on what you know about me, roast me!': 'Исходя из того, что вы знаете обо мне, пошутите надо мной!',
  'Batches': 'Пакеты',
  'Best option for math and coding. Disables tools.': 'Лучший вариант для математики и программирования. Отключает инструменты.',
  'Beta': 'Бета',
  'Better understand my workout routines': 'Лучше понять мои тренировки',
  'bid farewell to info chaos.': 'и распрощайтесь с информационным хаосом.',
  'Billing': 'Платежи',
  'Billing information': 'Платежная информация',
  'BindEmail': 'Привязать электронную почту',
  'Blog': 'Блог',
  'BriaAI': 'BriaИИ',
  'Browse': 'Обзор',
  'Browse Agents': 'Просмотреть агентов',
  'Build a homepage hub from the GitHub mini‑games repo': 'Создать главную страницу‑хаб на основе репозитория мини‑игр GitHub',
  'Build a luxury brand site for «PawPaw», dedicated to dachshunds': 'Создать сайт люксового бренда «PawPaw», посвящённого таксам',
  'Build financial apps by accessing account, transaction, and payment data through Plaid.': 'Создавайте финансовые приложения, получая доступ к данным счетов, транзакций и платежей через Plaid.',
  'Build Workers applications with storage, AI, and compute primitives.': 'Создавайте приложения Workers с использованием хранилищ, ИИ и вычислительных примитивов.',
  'Business Plan': 'Бизнес‑план',
  'Business plan for a small coffee shop': 'Бизнес‑план для небольшой кофейни',
  'By Mistral': 'От Мистраль',
  'By sharing your data to train our model, you can help improve your own experience and the quality of all users\' models. We take measures to ensure your privacy is protected throughout the process.': 'Делясь данными для обучения нашей модели, вы помогаете улучшить свой опыт использования и качество моделей для всех пользователей. Мы принимаем меры для защиты вашей конфиденциальности на протяжении всего процесса.',
  'Call Me the Crab Master': 'Назовите меня мастером по крабам',
  'Camera': 'Камера',
  'Can you guess my personality type?': 'Можете ли вы угадать мой тип личности?',
  'Cancel': 'Отмена',
  'Canvas': 'Холст',
  'career': 'моей карьере',
  'Central billing and administration': 'Централизованные платежи и администрирование',
  'Change Password': 'Сменить пароль',
  'Change the wording, keep the meaning': 'Изменить формулировку, сохранив смысл',
  'Change theme': 'Сменить тему',
  'Changelog': 'Список изменений',
  'Chat': 'Чат',
  'Chat Bubble UI': 'Интерфейс пузырьков чата',
  'Chat Endpoint': 'Конечная точка для чата (Chat)',
  'Chat History': 'История чатов',
  'Chat settings': 'Настройки чата',
  'Chat Tags Auto-Generation': 'Автоматическое создание тегов чата',
  'Chat with Kimi Slides': 'Чат с Кими-слайды',
  'Chats': 'Чаты',
  'Check for updates': 'Проверить обновления',
  'Check out student plan': 'Для вас специальные условия',
  'Choose a plan': 'Выберите план',
  'Choose a plan now to get access to our API.': 'Выберите план сейчас, чтобы получить доступ к нашему API.',
  'Classic high-performance model': 'Классическая высокопроизводительная модель',
  'Classic lightweight model': 'Классическая облегчённая модель',
  'Clear conversations': 'Очистить диалоги',
  'Close': 'Закрыть',
  'Cloudflare Developer Platform': 'Платформа разработчика Cloudflare',
  'Code Interpreter': 'Интерпретатор кода',
  'Codestral is available in select code-completion plugins but can also be queried directly. See the documentation for more details.': 'Codestral доступен в некоторых плагинах дополнения кода, но также может вызываться напрямую. См. документацию для получения более подробной информации.',
  'Collapse': 'Свернуть',
  'Communication settings': 'Настройки коммуникации',
  'Community': 'Сообщество',
  'Compare plans': 'Сравнить планы',
  'completion': 'Завершение',
  'Completion': 'Завершение',
  'Completion Endpoint': 'Конечная точка для дополнения (Completion)',
  'Completion rate limits per model': 'Лимиты скорости завершения по моделям',
  'Configure a monthly usage cap for the API consumption. If the limit is reached, the API access will be suspended until the next month begins or the limit is increased.': 'Настройте месячный лимит использования API. Если лимит будет достигнут, доступ к API будет приостановлен до начала следующего месяца или увеличения лимита.',
  'Configure your preferences related to Le Chat': 'Настройте ваши предпочтения, связанные с Ле-чат',
  'Confirm': 'Подтвердить',
  'Confirm password': 'Подтвердите пароль',
  'Connect': 'Подключить',
  'Connect to authentication, user management, and identity tools with Stytch.': 'Подключите инструменты аутентификации, управления пользователями и идентификации с помощью Stytch.',
  'Connect to Confluence and Jira to search, summarize, and perform project actions.': 'Подключитесь к Confluence и Jira для поиска, обобщения и выполнения действий по проекту.',
  'Connect to thousands of apps and automate workflows with Zapier.': 'Подключайтесь к тысячам приложений и автоматизируйте рабочие процессы с помощью Zapier.',
  'Connect to your data and AI assets in Snowflake for analysis and insights.': 'Подключите свои данные и ИИ‑ресурсы в Snowflake для анализа и получения аналитики.',
  'Connect to your data and AI workloads from Databricks to run queries and manage assets.': 'Подключите свои данные и ИИ‑нагрузки из Databricks для выполнения запросов и управления ресурсами.',
  'Connect to your Salesforce environment to query and act on CRM data.': 'Подключите свою среду Salesforce для выполнения запросов и работы с данными CRM.',
  'Connect to your tasks, projects, and boards in Monday.com.': 'Подключите свои задачи, проекты и доски в Monday.com.',
  'Connections': 'Подключения',
  'connectors': 'Подключения',
  'Connectors': 'Подключения',
  'Contact us': 'Связаться с нами',
  'Content': 'Содержимое',
  'Continue': 'Продолжить',
  'Control whether your data is used for improving our services.': 'Управляйте тем, используются ли ваши данные для улучшения наших сервисов.',
  'Control whether your data might be stored for troubleshooting and analytics.': 'Управляйте тем, могут ли ваши данные храниться для устранения неполадок и аналитики.',
  'Convert any CSV file into an analysis': 'Преобразуйте CSV-файл в аналитический',
  'Copied': 'Скопировано',
  'Copy': 'Копировать',
  'Copy code': 'Скопировать код',
  'Copy link': 'Скопировать ссылку',
  'Cost Per Day': 'Стоимость в день',
  'Craft a multi‑sensory artwork with immersive audio‑visual interplay': 'Создать мультисенсорное произведение искусства с погружающим аудиовизуальным взаимодействием',
  'Create': 'Создать',
  'Create a mobile site for a Garden Festival weekend': 'Создать мобильный сайт для фестиваля сада на выходные',
  'Create agent': 'Создать агента',
  'Create an 8‑page children\'s picture book about a dolphin\'s adventure': 'Создать 8‑страничную детскую иллюстрированную книгу о приключениях дельфина',
  'Create an Agent': 'Создать агента',
  'Create an agent to get started.': 'Создайте агента, чтобы начать.',
  'Create an e-commerce site for wool sneakers with brand tale and shopping features': 'Создать интернет‑магазин шерстяных кроссовок с историей бренда и функционалом для покупок',
  'Create and deploy a fine-tuned model from your own data.': 'Создайте и разверните настроенную модель на основе ваших данных.',
  'Create and deploy agents': 'Создавайте и развёртывайте агентов',
  'Create new key': 'Создать новый ключ',
  'Create project': 'Создать проект',
  'Create Project': 'Создать проект',
  'Creativity': 'Креативность',
  'Credits': 'Кредиты',
  'Current API usage for the ongoing month.': 'Текущее использование API за текущий месяц.',
  'Current plan': 'Текущий план',
  'Custom Connectors are still in beta. Unexpected behavior may occur. Proceed with care and review outputs carefully.': 'пользовательские подключения всё ещё находятся в бета-версии. Возможно непредвиденное поведение. Действуйте осторожно и внимательно проверяйте результаты.',
  'Custom Prompt': 'Пользовательский промт',
  'Customize': 'Настроить',
  'Customize your experience across all of our applications': 'Настройте ваш опыт работы во всех наших приложениях',
  'Daily office': 'Повседневные офисные задачи',
  'Danger zone': 'Опасная зона',
  'Dark': 'Темная',
  'Dark Mode': 'Тёмный режим',
  'Dashboard': 'Панель управления',
  'Data': 'Данные',
  'Data Analyst': 'Аналитик данных',
  'Data Visualization': 'Визуализация данных',
  'Databricks (Coming Soon)': 'Databricks (Скоро появится)',
  'Dedicated team support from Mistral AI': 'Специальная поддержка команды от Мистраль ИИ',
  'Deep insights for personal growth': 'Глубокие инсайты для личностного роста',
  'Deep research': 'Глубокое исследование',
  'Deep Research': 'Углублённое исследование',
  'Deep Think': 'Глубокое мышление',
  'Deep think, be smarter': 'Думай как следует, погружайся в тему!',
  'DeepThink·Auto': 'Углублённый анализ (авто)',
  'Default Workspace': 'Рабочее пространство по умолчанию',
  'Delete': 'Удалить',
  'Delete account': 'Удалить аккаунт',
  'Delete Account': 'Удалить аккаунт',
  'Delete all chats': 'Удалить все чаты',
  'Delete All Chats': 'Удалить все чаты',
  'Delete chat': 'Удалить чат',
  'Delete conversation': 'Удалить диалог',
  'Delete message?': 'Удалить сообщение?',
  'Delete organization': 'Удалить организацию',
  'Delete your account': 'Удалить учётную запись',
  'Demonstrations': 'Демонстрации',
  'Deploy': 'Развёртывание',
  'Description': 'Описание',
  'Deselect all': 'Снять выделение',
  'Design a mobile website for «Aurea» — a specialty coffee brand': 'Разработать мобильный сайт для «Aurea» — бренда специализированного кофе',
  'Design and prototype a SaaS to solve writing challenges for X content creators': 'Разработать прототип SaaS‑решения для преодоления трудностей в написании контента у креаторов X',
  'Dialogue': 'Диалог',
  'Dictation': 'Голос',
  'Disable': 'Отключить',
  'Disable all': 'Отключить все',
  'Disable to stop searching': 'Отключите, чтобы прекратить поиск',
  'Display the username instead of You in the Chat': 'Показывать имя пользователя вместо «Вы» в чате',
  'Docs': 'Документация',
  'Document AI': 'ИИ для работы с документами',
  'Document collaboration': 'Совместная работа с документами',
  'Document Hub': 'Центр документов',
  'Domain Ownership': 'Владение доменом',
  'Domain verification': 'Подтверждение домена',
  'Domain verification is not supported for your domain': 'Проверка домена не поддерживается для вашего домена',
  'Don\'t have an account?': 'Нет аккаунта?',
  'Don\'t worry, you can choose one right now!': 'Не беспокойтесь, вы можете выбрать его прямо сейчас!',
  'Download': 'Скачать',
  'Download & Self-Deployment of models': 'Загрузка и самостоятельное развёртывание моделей',
  'Download image': 'Скачать изображение',
  'Draft powerful and precise speeches': 'Составлять мощные и точные тексты выступлений',
  'Drop PDFs or images here': 'Разместите PDF или картинки здесь',
  'Drop the idea, I\'ll draft the outline and build the deck.': 'Поделитесь идеей — я составлю план и создам презентацию.',
  'Duplicate': 'Дублировать',
  'Early access to new Lab features': 'Ранний доступ к новым функциям Lab',
  'Eating Crab? Avoid These Parts!': 'Едите краба? Избегайте этих частей!',
  'Edit': 'Редактировать',
  'Edit message': 'Редактировать сообщение',
  'Efficient model with vision': 'Эффективная модель с дальновидностью',
  'Efficiently solve writing problems': 'Эффективно решать задачи, связанные с написанием текстов',
  'Elevate your writing with the Personal Writing Assistant, your dedicated editor combining': 'Повысьте уровень своего письма с помощью персонального помощника по написанию текстов, вашего личного редактора, объединяющего',
  'Elevate your writing with the Personal Writing Assistant, your dedicated editor combining precision and style to enhance clarity and impact in your work.': 'Улучшите свой стиль с помощью персонального помощника по написанию текстов, вашего специализированного редактора, сочетающего точность и стиль для повышения ясности и результативности вашей работы.',
  'Email': 'Почта',
  'Email preferences': 'Настройки email',
  'Empower your team with a secure, collaborative, AI-powered organization.': 'Усилить вашу команду с помощью безопасной, совместной организации на базе ИИ.',
  'empty': 'пусто',
  'Enable': 'Включить',
  'Enable accelerated answers': 'Включить ускоренные ответы',
  'Enable Flash Answers': 'Включить быстрые ответы',
  'Enable for reasoning': 'Включите для логических рассуждений',
  'Enable to use researcher mode. (1/1) free sessions remaining': 'Включите режим исследователя. Осталась 1 бесплатная сессия (1/1).',
  'Enable tools': 'Включить инструменты',
  'Enabled': 'Включено',
  'Endpoints': 'Конечные точки (эндпоинты)',
  'English (US)': 'Английский (США)',
  'Enter a gift code to redeem credits or activate special offers.': 'Введите подарочный код, чтобы получить кредиты или активировать специальные предложения.',
  'Enter a system prompt for the model (Optional)': 'Введите системный промпт для модели (необязательно)',
  'Enter to send': 'Enter — отправить',
  'Enterprise': 'Для организаций',
  'ERNIE 4.5 Turbo': 'ERNIE 4.5 Турбо',
  'Evaluate MACD trading strategy on the NASDAQ Composite': 'Оценить торговую стратегию на основе MACD для индекса NASDAQ Composite',
  'Event News': 'Новости мероприятий',
  'Everything in Allegretto': 'Всё, что входит в Аллегретто',
  'Everything in Free, plus:': 'Всё, что в бесплатной версии, плюс:',
  'Everything in Moderato': 'Всё, что входит в Модерато',
  'Everything in Pro, plus:': 'Всё, что в версии Про, плюс:',
  'Everything that is shared is anonymized.': 'Всё, что передается, анонимизируется.',
  'Expand': 'Расширить',
  'Experience personalized learning with your Personal Tutor, begin by asking for help in a subject or uploading a PDF on material you want to assistance with': 'Опыт персонализированного обучения с вашим персональным репетитором, начните с запроса помощи по предмету или загрузки PDF с материалом, по которому вам нужна помощь',
  'Experience-based insights': 'Выводы на основе опыта',
  'Experiment': 'Экспериментальный',
  'Expired': 'Истекшие',
  'Explain': 'Объяснить',
  'Explore on Zread': 'Изучить на Zread',
  'Explore our market-leading open models.': 'Изучите наши ведущие на рынке открытые модели.',
  'Explore U.S. housing prices and affordability using Zillow data': 'Изучить цены на жильё и его доступность в США с использованием данных Zillow',
  'Export': 'Экспорт',
  'Export Chats': 'Экспорт чатов',
  'Export easily for each Mistral AI product your personal data.': 'Легко экспортируйте ваши персональные данные для каждого продукта Mistral AI.',
  'Export your Le Chat personal data.': 'Экспортировать ваши персональные данные Ле-чат.',
  'Export your personal data': 'Экспорт ваших персональных данных',
  'Extended access limits to flash answers': 'Расширенные лимиты доступа к быстрым ответам',
  'Extended access to news, file uploads, advanced data analysis, and image generations': 'Расширенный доступ к новостям, загрузке файлов, продвинутому анализу данных и генерации изображений',
  'Extended Researcher quota': 'Увеличенный лимит для Иследования',
  'favorites': 'моих увлечениях',
  'Featured': 'Избранное',
  'Featured Connectors': 'Рекомендуемые подключения',
  'Feedback': 'Обр-ая связь',
  'Feedback Channel': 'Канал обратной связи',
  'Few-Shot Prompts': 'Промпты с малым числом примеров',
  'File size': 'Размер файла',
  'Files': 'Файлы',
  'Filter models...': 'Фильтровать модели...',
  'Filter...': 'Фильтр...',
  'Find our FAQ and additional resources.': 'Найдите наши ответы на часто задаваемые вопросы и дополнительные ресурсы.',
  'Fine-tune a model': 'Настройте модель под себя',
  'Fine-tuned models': 'Настроенные модели',
  'Fine-tuning - Model Storage': 'Тонкая настройка - Хранение моделей',
  'Fine-tuning - Training': 'Тонкая настройка - Обучение',
  'Fine-tuning jobs are limited by concurrency, tokens per job and total usage.': 'Задачи тонкой настройки ограничены по параллелизму, количеству токенов на задачу и общему объёму использования.',
  'Fine-tuning limits': 'Лимиты тонкой настройки',
  'First name': 'Имя',
  'Flagship model': 'Флагманская модель',
  'Flagship model, excels at coding and long-horizon tasks': 'Флагманская модель, отлично справляется с программированием и долгосрочными задачами',
  'Flash answers': 'Быстрые ответы',
  'Font size': 'Размер шрифта',
  'Forgot password?': 'Забыли пароль?',
  'Format': 'Формат',
  'Free': 'Бесплатный',
  'Full-Stack': 'Полнофункциональный (full‑stack)',
  'General': 'Общие',
  'Generate': 'Сгенерировать',
  'Generate API Key': 'Сгенерировать ключ API',
  'Generate code and charts': 'Генерация кода и диаграмм',
  'Generate images': 'Генерировать изображения',
  'Generate, edit, and customize visuals with Bria\'s generative AI platform': 'Создавайте, редактируйте и настраивайте визуальные материалы с помощью генеративной ИИ‑платформы Бриа.',
  'Generating': 'Генерация',
  'Get access to higher rate limits and more features.': 'Получите доступ к более высоким лимитам запросов и дополнительным функциям.',
  'Get an expert research report in minutes with 10x the sources': 'Получите отчёт с экспертным исследованием за считанные минуты, используя в 10 раз больше источников',
  'Get improved, personalized answers by connecting your knowledge.': 'Получайте улучшенные, персонализированные ответы, подключая свои знания.',
  'Get Moderato': 'Оформить подписку Модерато',
  'Get product support': 'Техподдержка',
  'Get started': 'Начать работу',
  'Get started with Mistral AI': 'Начните работу с Мистраль ИИ',
  'Get to know me': 'Познакомьтесь со мной',
  'Get Vivace': 'Оформить подписку Vivace',
  'GLM-4.6 Tech Blog': 'Техноблог GLM‑4.6',
  'GLM-5.2 is intensifying the coordination of resources, please switch to GLM-5-Turbo for experience or try again later.': 'GLM-5.2 улучшает координацию ресурсов, пожалуйста, переключитесь на GLM-5-Turbo для получения опыта или повторите попытку позже.',
  'Global Summarizer': 'Глобальный суммаризатор',
  'Go to email preferences portal': 'Перейти в портал настроек email',
  'Go to export center': 'Перейти в центр экспорта',
  'Good afternoon': 'Добрый день',
  'Good evening': 'Добрый вечер',
  'Good morning': 'Доброе утро',
  'Google Calendar': 'Google Календарь',
  'Grant': 'Разрешение',
  'Help': 'Помощь',
  'Help Center': 'Центр помощи',
  'Hide thinking': 'Скрыть размышления',
  'How can I help you today?': 'Чем я могу помочь сегодня?',
  'How would you introduce me if I were giving a speech?': 'Как бы вы представили меня, если бы я выступал с речью?',
  'If you want to permanently delete this organization and all its data, you can do so on the right. This will not delete the users members of this organization.': 'Если вы хотите навсегда удалить эту организацию и все её данные, вы можете сделать это справа. Это не удалит пользователей - членов этой организации.',
  'Image': 'Изображение',
  'Image generation': 'Генерация изображений',
  'Image Generation': 'Генерация изображений',
  'Image Studio': 'Студия изображений',
  'Import': 'Импорт',
  'Import Chats': 'Импорт чатов',
  'Improve Model': 'Улучшение модели',
  'In case you need to raise your usage limits, please feel free to contact us by utilizing the support button, providing details about your specific use case.': 'Если вам нужно увеличить лимиты использования, пожалуйста, свяжитесь с нами через кнопку поддержки, указав подробности вашего конкретного случая использования.',
  'In-depth research analysis': 'Углублённый анализ исследований',
  'In-depth writing': 'Углублённое написание текстов',
  'Include your calendar in your chats.': 'Включить ваш календарь в чаты.',
  'Include your email in your chats.': 'Включить ваш email в чаты.',
  'Insights': 'Аналитика',
  'Inspiration': 'Вдохновение',
  'Install': 'Установить',
  'Install from file': 'Установить из файла',
  'Install from URL': 'Установить из URL',
  'Install script': 'Установить скрипт',
  'Instructions': 'Инструкции',
  'Intelligence': 'Интеллект',
  'Interact with z.ai and explore the boundless creative world': 'Взаимодействуйте с z.ai и исследуйте безграничный творческий мир',
  'Intercom (Coming Soon)': 'Intercom (Скоро появится)',
  'Interface': 'Интерфейс',
  'Invoices': 'Счета',
  'Jobs limits': 'Лимиты задач',
  'Join our discord': 'Наш Discord',
  'Keyboard shortcuts': 'Горячие клавиши',
  'Kimi Slides': 'Кими слайды',
  'Knowledge': 'Знания (база данных агента)',
  'La Plateforme plan': 'План La Plateforme',
  'Language': 'Язык',
  'Language settings': 'Настройки языка',
  'Last name': 'Фамилия',
  'Le Chat Plan': 'План Ле-Чат',
  'Learn more': 'Подробнее',
  'Leave organization': 'Покинуть организацию',
  'Less': 'Меньше',
  'libraries': 'Библиотеки',
  'Libraries': 'Библиотеки',
  'Libraries API': 'API Библиотек',
  'Light': 'Светлая',
  'Light Mode': 'Светлый режим',
  'Limited Offer Free $19 API credits': 'Ограниченное предложение: бесплатные кредиты API на $19',
  'Limited Offer Free $199 API credits': 'Ограниченное предложение: бесплатные кредиты API на $199',
  'Limited Offer Free $39 API credits': 'Ограниченное предложение: бесплатные кредиты API на $39',
  'Limits': 'Лимиты',
  'Localisation': 'Локализация',
  'Log in': 'Войти',
  'Log in with your student email to benefit from the student plan': 'Войдите в систему, указав свой студенческий e-mail, чтобы воспользоваться этим тарифным планом',
  'Log out': 'Выйти',
  'Lower values make results more predictable. Higher values make results more novel.': 'Меньшие значения делают результаты более предсказуемыми. Большие значения делают результаты более оригинальными.',
  'Magic Design': 'Волшебный дизайн',
  'Make a website for linen clothes & home products with broad SKUs': 'Создать веб‑сайт для продажи льняной одежды и товаров для дома с широким ассортиментом SKU',
  'Make your chats even more relevant': 'Сделайте ваши чаты еще более релевантными',
  'Make your first Chat completion API requests.': 'Сделайте свои первые запросы к API завершения чата.',
  'Manage tasks, projects, and updates from Asana.': 'Управляйте задачами, проектами и обновлениями в Асана.',
  'Manage the access settings of your organization.': 'Управление настройками доступа вашей организации.',
  'Manage the emails that you receive from us.': 'Управление email-сообщениями, которые вы получаете от нас.',
  'Manage your authentication settings': 'Управление вашими настройками аутентификации',
  'Manage your La Plateforme subscription.': 'Управление вашей подпиской La Plateforme.',
  'Manage your Le Chat subscription.': 'Управление вашей подпиской Ле-Чат.',
  'Manage your logins through Google or Microsoft.': 'Управление вашими входами через Google или Microsoft.',
  'Manage your Multi-factor authentication with an Authenticator app.': 'Управление вашей многофакторной аутентификацией с помощью приложения Authenticator.',
  'Manage your organization billing information.': 'Управление информацией о платежах вашей организации.',
  'Manage your organization members, their role, and subscriptions.': 'Управление участниками вашей организации, их ролями и подписками.',
  'Manage your organization settings.': 'Управление настройками вашей организации.',
  'Manage your personal information': 'Управление вашей личной информацией',
  'Manage your privacy settings': 'Управление вашими настройками конфиденциальности',
  'Manage your privacy settings for our API.': 'Управление вашими настройками конфиденциальности для нашего API.',
  'Manage your workspaces.': 'Управление вашими рабочими пространствами.',
  'Map out your business vision': 'Описать видение вашего бизнеса',
  'Match': 'Совпадение',
  'Max tokens': 'Макс. токенов',
  'Maximum concurrent jobs': 'Максимальное количество одновременных задач',
  'Maximum number of jobs per month': 'Максимальное количество задач в месяц',
  'Maximum requests per second': 'Максимальное количество запросов в секунду',
  'Maximum tokens per job': 'Максимальное количество токенов на задачу',
  'Media & press': 'Медиа и пресса',
  'Meet OK Computer': 'Знакомьтесь, OK-Компьютер',
  'Members': 'Участники',
  'Memories': 'Воспоминания',
  'Memories in Le Chat': 'Воспоминания в Le Chat',
  'Memory': 'Память',
  'Message': 'Сообщение',
  'Microphone': 'Микрофон',
  'Mine': 'Мои',
  'Mobile App': 'Мобильное приложение',
  'Model': 'Модель',
  'Model is currently at capacity. Please try again later or switch to another model.': 'Модель перегружена. Попробуйте позже или переключитесь на другую модель.',
  'Model settings': 'Настройки модели',
  'Models': 'Модель',
  'month': 'месяц',
  'Monthly API spending limit': 'Месячный лимит расходов на API',
  'More': 'Ещё',
  'More models': 'Другие модели',
  'More thoughtful answers with transparent reasoning': 'Более продуманные ответы с прозрачной аргументацией',
  'More usage than Pro for live journalism info with AFP news, file uploads, advanced data analysis, image generation, and flash answers': 'Больше возможностей, чем в версии Про, для живой журналистской информации с новостями AFP, загрузки файлов, продвинутого анализа данных, генерации изображений и быстрых ответов',
  'Most advanced model': 'Самая совершенная модель',
  'Most advanced model, excelling in all-round tasks': 'Передовая модель для самых разноплановых задач',
  'Move to': 'Переместить в',
  'Move to folder': 'Переместить в папку',
  'Multi-factor authentication': 'Многофакторная аутентификация',
  'My agents': 'Мои агенты',
  'My Agents': 'Мои агенты',
  'My Collection': 'Моя коллекция',
  'My Connections': 'Мои подключения',
  'My Connectors': 'Мои подключения',
  'My libraries': 'Мои библиотеки',
  'Name': 'Название',
  'Needle': 'Нидл',
  'New 4X speed Kimi Slides generation with priority access at peak hours': 'Новое: генерация Kimi Slides в 4‑кратном ускорении с приоритетным доступом в часы пик',
  'New agent': 'Новый агент',
  'New chat': 'Новый чат',
  'New Chat': 'Новый чат',
  'New chat with this library': 'Новый чат с этой библиотекой',
  'New folder': 'Новая папка',
  'New Library': 'Новая библиотека',
  'New model for chat, coding, and agentic task': 'Модель для общения, кодинга и выполнения агентских задач',
  'New project': 'Новый проект',
  'New script': 'Новый скрипт',
  'New workspace': 'Новое рабочее пространство',
  'News Commentary': 'Комментарий к новостям',
  'Nickname': 'Никнейм',
  'No': 'Нет',
  'No active plan yet.': 'Пока нет активного плана.',
  'No agents yet': 'Пока нет агентов',
  'No content': 'Нет содержимого',
  'No description': 'Нет описания',
  'No historical dialogue': 'Нет истории диалогов',
  'No MCP custom connections found': 'Пользовательские подключения MCP не найдены',
  'No payment method added yet.': 'Пока не добавлено ни одного способа оплаты.',
  'No plan is currently active on this organization, the API keys will not be active.': 'В настоящее время у этой организации нет активного плана, ключи API не будут активны.',
  'No related chat history': 'Нет истории связанных чатов',
  'No results found': 'Ничего не найдено',
  'No scheduled tasks set': 'Нет запланированных задач',
  'No thinking, instant answer': 'Без размышлений, мгновенный ответ',
  'Not enabled': 'Не включено',
  'Not logged in': 'Не выполнен вход',
  'Notifications': 'Уведомления',
  'OCR': 'Оптическое распознавание символов',
  'of 5 searches left for this month': 'из 5 запросов, за этот месяц',
  'Off': 'Выключено',
  'OK Computer': 'OK-Компьютер',
  'OK Computer is Kimi\'s new agent mode (early beta). Your all-in-one AI PM, designer, developer, and data analyst': 'OK-Компьютер - это новый режим агента Кими (ранняя бета). Ваш универсальный специалист по ИИ, дизайнер, разработчик и аналитик данных',
  'Older': 'Старые',
  'On': 'Включено',
  'On-the-spot coverage': 'Оперативное освещение событий',
  'Oops, something went wrong. Please refresh the page or try again later.': 'К сожалению, что-то пошло не так. Пожалуйста, обновите страницу или повторите попытку позже.',
  'Open': 'Открыть',
  'Open New Chat': 'Открыть новый чат',
  'Open settings': 'Открыть настройки',
  'Open this library': 'Откройте эту библиотеку',
  'Options': 'Опции',
  'Organization': 'Организация',
  'Organization API keys': 'Ключи API организации',
  'Organization ID': 'ID организации',
  'Organization identification': 'Идентификация организации',
  'Organization limits': 'Ограничения организации',
  'Organization name': 'Название организации',
  'Organization settings': 'Настройки организации',
  'Organize and include information for your chats.': 'Организуйте и включайте информацию для ваших чатов.',
  'Organize conversations like folders,': 'Организуйте диалоги как папки',
  'Organize document libraries and crawl websites to include in your conversations': 'Организуйте библиотеки документов и обходите веб-сайты для включения в ваши беседы',
  'Overview': 'Обзор',
  'Painting': 'Рисование',
  'Para Visualization': 'Визуализация параграфов',
  'Password': 'Пароль',
  'Paste Large Text as File': 'Вставлять большой текст как файл',
  'Payment methods': 'Способы оплаты',
  'Personal Tutor': 'Персональный репетитор',
  'Personalization': 'Персонализация',
  'Pin': 'Закрепить',
  'Pinned': 'Закреплено',
  'Plaid Developer Tools': 'Инструменты разработчика Plaid',
  'Plan': 'Тариф',
  'Playground': 'Игровая площадка (тестовое окружение)',
  'Powerful new-generation visual model': 'Мощная визуальная модель нового поколения',
  'Practical Report': 'Практический отчёт',
  'Preferences': 'Настройки',
  'Presentation on the history of rock \'n\' roll music': 'Презентация об истории рок‑н‑ролла',
  'Preview your agent': 'Предварительный просмотр вашего агента',
  'Previous 30 days': 'Последний месяц',
  'Previous 7 days': 'Последняя неделя',
  'Previous flagship model': 'Предыдущая флагманская модель',
  'Price': 'Цена',
  'Prime the model with high-quality input/output examples to improve performance.': 'Подготовьте модель с помощью высококачественных примеров ввода/вывода для улучшения производительности.',
  'Priority access during peak hours': 'Приоритетный доступ в часы пик',
  'Privacy': 'Конфиденциальность',
  'Privacy Policy': 'Политика конфиденциальности',
  'Private': 'Приватный',
  'Pro': 'Про',
  'PRO': 'ПРО',
  'Pro plan with student discount': 'Профессиональный тарифный план со скидкой для студентов',
  'Professional writing': 'Профессиональное письмо',
  'Profile': 'Профиль',
  'Profile Image': 'Изображение профиля',
  'Project': 'Проект',
  'Projects': 'Проект',
  'Prompt': 'Промпт',
  'Public link': 'Публичная ссылка',
  'Pure Thinking': 'Чистое мышление',
  'Purpose of this agent': 'Назначение этого агента',
  'Quality': 'Качество',
  'Query issues, debug errors, and get insights from your Sentry data.': 'Выполняйте запросы по проблемам, отлаживайте ошибки и получайте аналитику из данных Sentry.',
  'Query, manage, and explore your data through Prisma\'s ORM and Data Platform.': 'Выполняйте запросы, управляйте и исследуйте свои данные через ORM и платформу данных Prisma.',
  'Quick reply wherever you are.': 'Быстрый ответ, где бы вы ни находились.',
  'Quickstart': 'Быстрое начало',
  'Randomness': 'Случайность',
  'Rate limit per second': 'Лимит запросов в секунду',
  'Read Aloud': 'Читать вслух',
  'Reading': 'Чтение',
  'Reasoning': 'Логические рассуждения',
  'Recent chats': 'Недавние чаты',
  'Redeem a gift code': 'Активировать подарочный код',
  'Reflections': 'Размышления',
  'Regenerate': 'Перегенерировать',
  'Regenerate response': 'Перегенерировать ответ',
  'Related Chats': 'Связанные чаты',
  'Rename': 'Переименовать',
  'Report': 'Пожаловаться',
  'Report on psychology of social media use': 'Доклад о психологии использования социальных сетей',
  'Request email check': 'Запросите проверку электронной почты',
  'Requests are billed ilke regular APi calls.': 'Запросы оплачиваются как обычные вызовы API.',
  'Requests are billed like regular API calls.': 'Запросы оплачиваются как обычные вызовы API.',
  'Require': 'Требование',
  'Research': 'Исследование',
  'Research Report': 'Исследовательский отчёт',
  'Researcher': 'Исследование',
  'Researcher & OK Computer multi-tasking': 'Возможность одновременной работы с Иследованием и OK-компьютером',
  'Resend code': 'Отправить код снова',
  'Reset Sort': 'Сбросить сортировку',
  'ResetPassword': 'Сбросить пароль',
  'Restore': 'Восстановить',
  'Retry': 'Повторить',
  'Review and summarize progress': 'Проанализировать и обобщить достигнутые результаты',
  'Rewrite': 'Переписать',
  'Role': 'Роль',
  'Run at': 'Запускать на',
  'Safely connect to and analyze your payments data in PayPal.': 'Безопасно подключайтесь и анализируйте данные о платежах в PayPal.',
  'Salesforce (Coming Soon)': 'Salesforce (Скоро появится)',
  'Same quality at 10x the speed.': 'То же качество при скорости в 10 раз выше.',
  'Sandbox': 'Песочница',
  'Save': 'Сохранить',
  'Save at least 10 memories to unlock this prompt': 'Сохраните как минимум 10 воспоминаний, чтобы разблокировать этот запрос',
  'Save frequently used prompts.': 'Сохраняйте часто используемые промты.',
  'Save frequently used prompts. Insert with a shortcut.': 'Сохраняйте часто используемые промты. Вставляйте их с помощью сочетания клавиш.',
  'Saved': 'Сохранено',
  'Saved Prompts': 'Сохранённые промты',
  'Scripts': 'Скрипты',
  'Scroll to bottom when switching between branches': 'Прокручивать вниз при переключении между ветками диалога',
  'Search': 'Поиск',
  'Search and explore models, datasets, and documentation from Hugging Face.': 'Ищите и изучайте модели, наборы данных и документацию на Hugging Face.',
  'Search and summarize knowledge across connected Deepwiki sources.': 'Ищите и обобщайте знания из подключённых источников DeepWiki.',
  'Search chats': 'Поиск по чатам',
  'Search repositories, review issues, and manage pull requests in GitHub.': 'Поиск репозиториев, просмотр проблем и управление запросами на включение в GitHub.',
  'Search Saved Prompts': 'Поиск по сохранённым промтам',
  'Search the web': 'Поиск в интернете',
  'Search the web, academic papers and work with your data in Jina': 'Ищите в интернете, научных статьях и работайте со своими данными в Jina.',
  'Search through your emails and draft replies directly in Outlook.': 'Поиск по электронной почте и составление черновиков ответов прямо в Outlook.',
  'Search, analyze, and get insights from your files in Box.': 'Поиск, анализ и получение информации из ваших файлов в Box.',
  'Search, retrieve, and interact with your vector data through Pinecone.': 'Ищите, извлекайте и взаимодействуйте с векторными данными через Pinecone.',
  'Search, summarize, and author content in Notion.': 'Поиск, обобщение и создание контента в Notion.',
  'Search, summarize, and manage your issues and projects in Linear.': 'Поиск, обобщение и управление вашими задачами и проектами в Linear.',
  'Security & Access': 'Безопасность и доступ',
  'See more': 'Показать ещё',
  'Select all': 'Выбрать все',
  'Select model': 'Выбрать модель',
  'Select the language for the user interface': 'Выберите язык для пользовательского интерфейса',
  'Send': 'Отправить',
  'Send message': 'Отправить сообщение',
  'Set a new password for your account.': 'Установите новый пароль для вашего аккаунта.',
  'Set new password': 'Установить новый пароль',
  'Set the rate limit for your Completion API consumption. This limit will be applied to all models.': 'Установить лимит скорости использования API завершения. Этот лимит будет применяться ко всем моделям.',
  'Settings': 'Настройки',
  'Setup a monthly API spending limit.': 'Настроить месячный лимит расходов на API.',
  'Setup billing to use a gift code': 'Настройте платежи для использования подарочного кода',
  'Shape your brand image': 'Формировать имидж вашего бренда',
  'share': 'Поделиться',
  'Share': 'Поделиться',
  'Share Kimi+': 'Поделись Кими+',
  'Share link': 'Поделиться ссылкой',
  'Share Session': 'Поделиться сессией',
  'Shared': 'Общие',
  'Shared chats': 'Общие чаты',
  'Sharp news analysis': 'Острый анализ новостей',
  'Shortcuts': 'Горячие клавиши',
  'Show': 'Показать',
  'Show consumption in USD': 'Показать потребление в долларах США',
  'Show less': 'Показать меньше',
  'Show more': 'Показать больше',
  'Show thinking': 'Показать размышления',
  'Sign in': 'Войти',
  'Sign Out': 'Выйти',
  'Sign up': 'Регистрация',
  'Size': 'Размер',
  'Smart decision on thinking': 'Интеллектуальное решение о необходимости размышлений',
  'Smarter answers with transparent reasoning': 'Более умные ответы с прозрачным обоснованием',
  'Smarter, think deeper': 'Умнее, мыслит глубже',
  'Snowflake (Coming Soon)': 'Snowflake (Скоро появится)',
  'Social logins': 'Социальные логины',
  'Sort by Name ↑': 'Сортировать по имени ↑',
  'Sort by Tokens per Minute': 'Сортировать по токенам в минуту',
  'Sort by Tokens per Month': 'Сортировать по токенам в месяц',
  'Source': 'Источник',
  'Sources': 'Источники',
  'Speech': 'Речь (подготовка выступлений)',
  'Spending limit': 'Лимит расходов',
  'Square': 'Сквэйр',
  'Star': 'Избранное',
  'Start experimenting quickly': 'Начинайте экспериментировать быстро',
  'Status': 'Статус',
  'Stop': 'Стоп',
  'Stop generating': 'Остановить генерацию',
  'storage': 'Хранение',
  'Stronger and faster': 'Мощнее и быстрее',
  'Student': 'Студенческий',
  'Style': 'Стиль',
  'Subscription': 'Подписка',
  'Summarize': 'Кратко изложить',
  'Summarize documents of any type into clear, concise summaries': 'Суммаризируйте документы любого типа в четкие, краткие резюме',
  'Summary Report': 'Сводный отчёт',
  'Switch organization': 'Сменить организацию',
  'Switch to GLM-5-Turbo': 'Переключится на GLM-5-турбо',
  'System': 'Системная',
  'System Mode': 'Системный режим',
  'System prompt': 'Системный промпт',
  'System Prompt': 'Системный промпт',
  'Team': 'Командный',
  'Tell me something about me I might not even know myself!': 'Расскажите мне что-нибудь обо мне, чего я, возможно, даже не знаю сам!',
  'Temperature': 'Температура (параметр случайности)',
  'Terms': 'Условия',
  'Text and Chat completions': 'Дополнение текста и чата',
  'Text to slides, in minutes.': 'Преобразование текста в слайды за минуты.',
  'The amount of credits on your account. The next monthly usage will be deducted of this amount.': 'Количество кредитов на вашем аккаунте. Следующее ежемесячное использование будет вычтено из этой суммы.',
  'The chat history has been updated. Please confirm and resend.': 'История чата была обновлена. Подтвердите и отправьте сообщение повторно.',
  'The default method is used automatically for all your subscriptions.': 'Способ по умолчанию используется автоматически для всех ваших подписок.',
  'The initial instructions for focusing the model capabilities on a defined behavior or task.': 'Начальные инструкции для фокусировки возможностей модели на определённом поведении или задаче.',
  'Theme': 'Тема',
  'Think': 'Размышлять',
  'Think thoroughly, better answers': 'Тщательно обдумывать, давать более качественные ответы',
  'Thinking': 'Размышляющий',
  'This action cannot be undone. Do you wish to continue?': 'Это действие нельзя отменить. Удаляем?',
  'This action cannot be undone. This will permanently delete your account and all associated data.': 'Это действие НЕЛЬЗЯ отменить. Ваша учетная запись и все связанные с ней данные будут удалены без возможности восстановления.',
  'This is the default workspace. It can not be deleted.': 'Это рабочее пространство по умолчанию. Его нельзя удалить.',
  'This is the email you use to log in with your password.': 'Это email, который вы используете для входа с паролем.',
  'Thought process': 'Процесс размышления',
  'Thought Process': 'Мыслительный процесс',
  'Title Auto-Generation': 'Автоматическое создание заголовка',
  'To ensure the highest level of service quality, our API enforces limitations. Additionally, you have the option to establish spending caps for your account to prevent incurring excessive fees.': 'Для обеспечения наивысшего уровня качества обслуживания, наш API применяет ограничения. Кроме того, у вас есть возможность установить лимиты расходов для вашего аккаунта, чтобы предотвратить чрезмерные затраты.',
  'Today': 'Сегодня',
  'Toggle theme': 'Сменить тему',
  'Tokens per Minute': 'Токены в минуту',
  'Tokens per Month': 'Токены в месяц',
  'Tools': 'Инструменты',
  'Total Cost': 'Общая стоимость',
  'Total:': 'Всего:',
  'training': 'Обучение',
  'Translate': 'Перевести',
  'Trash': 'Корзина',
  'travel experiences': 'моих путешествиях',
  'Trigger Word': 'Триггерное слово',
  'Type to add a new memory': 'Введите, чтобы добавить новое воспоминание',
  'Understand my daily habits and productivity tips': 'Понять мои ежедневные привычки и советы по продуктивности',
  'Unify your company data for instant, AI-powered search across everything.': 'Объедините данные вашей компании для мгновенного поиска с помощью ИИ по всем источникам.',
  'Uninstall': 'Удалить',
  'Unlimited access to Mistral’s highest-performing model and web browsing*': 'Неограниченный доступ к самой производительной модели Мистраль и веб-серфингу*',
  'Unlimited number of messages per day*': 'Неограниченное количество сообщений в день*',
  'Unlock enhanced productivity with extended capabilities.': 'Повысьте продуктивность с расширенными возможностями.',
  'Unlock the full potential of Le Chat with a Pro subscription.': 'Раскройте весь потенциал Ле-чат с подпиской Про.',
  'Unlock the full potential of Le Chat.': 'Раскройте весь потенциал Ле-чат.',
  'Unpin': 'Открепить',
  'Unpin Kimi+': 'Открепи Кими+',
  'Unsubscribe': 'Отписаться',
  'Untitled Ag…': 'Безымянный аг…',
  'Untitled Agent': 'Безымянный агент',
  'Update': 'Обновить',
  'Update all': 'Обновить все',
  'Update profile': 'Обновить профиль',
  'Upgrade': 'Обновить',
  'Upgrade plan': 'Улучшить тариф',
  'Upgrade to Le Chat Pro': 'Обновить до Ле-Чат Про',
  'Upgrade to Scale': 'Перейдите на тариф Scale',
  'Upgrade your plan': 'Обновите тарифный план',
  'Upload': 'Загрузить',
  'Upload file': 'Загрузить файл',
  'Upload image': 'Загрузить изображение',
  'Usage': 'Использование',
  'Usage of your organization.': 'Использование вашей организацией.',
  'Use Codestral via your favorite Code completion tool for free.': 'Используйте Codestral через ваш любимый инструмент дополнения кода бесплатно.',
  'Use Initials Remove': 'Удалить использование инициалов',
  'Use models, instructions, and demonstrations to create a custom agent to deploy on le Chat.': 'Используйте модели, инструкции и демонстрации, чтобы создать собственного агента для развёртывания в Ле-чат.',
  'Use projects to organize and share chats.': 'Используйте проекты для организации чатов и обмена ими.',
  'Use this API key to call Codestral via your favorite Code completion tool.': 'Используйте этот ключ API для вызова Codestral через ваш любимый инструмент дополнения кода.',
  'User': 'Пользователь',
  'User Agreement': 'Пользовательское соглашение',
  'User ID': 'ID пользователя',
  'User settings': 'Настройки пользователя',
  'Username': 'Имя пользователя',
  'Verification code': 'Код подтверждения',
  'Verify your domain to enable email domain authentication and other enterprise features.': 'Подтвердите владение доменом, чтобы включить аутентификацию по email‑домену и другие корпоративные функции.',
  'Verify your email domain to enable domain-based authentication and other enterprise features.': 'Подтвердите свой email‑домен, чтобы включить доменную аутентификацию и другие корпоративные функции.',
  'Version': 'Версия',
  'View all': 'Показать все',
  'View more': 'Показать ещё',
  'Vision': 'Зрение (работа с изображениями)',
  'Vision model with evolved intelligence': 'Визуальная модель с развитым интеллектом',
  'Voice': 'Голос',
  'Voice Input': 'Голосовой ввод',
  'Web App': 'Веб‑приложение',
  'Web search': 'Поиск в интернете',
  'Web Search': 'Поиск',
  'Welcome': 'Добро пожаловать',
  'What are three key insights about my personality, goals, or habits that I might be overlooking?': 'Какие три ключевых аспекта моей личности, целей или привычек я могу упускать из виду?',
  'What can I do to get to the next level of my career?': 'Что я могу сделать, чтобы перейти на следующий уровень в карьере?',
  'Widescreen Mode': 'Режим широкоформатного экрана',
  'Will appear on each invoice. Changes do not affect invoices that have already been emitted.': 'Будет отображаться на каждом счете. Изменения не влияют на уже выданные счета.',
  'Workspaces': 'Рабочие пространства',
  'Write code': 'Писать код',
  'Write Code': 'Написать код',
  'Write instructions here. Type / to specify knowledge and tools': 'Напишите инструкции здесь. Введите /, чтобы указать знания и инструменты',
  'Write something to test the agent before deployment.': 'Напишите что‑нибудь для тестирования агента перед развёртыванием.',
  'Writing': 'Написание текстов',
  'Writing Assistant': 'Помощник по написанию текстов',
  'Writing Desk': 'Рабочий стол для написания текстов',
  'Yes': 'Да',
  'Yesterday': 'Вчера',
  'You can have up to 50 active API keys per organization.': 'Вы можете иметь до 50 активных ключей API на организацию.',
  'You can save important conversations, documents, and images here': 'Здесь можно сохранять важные диалоги, документы и изображения',
  'You don\'t have a plan yet.': 'У вас пока нет плана.',
  'You don\'t have an active subscription on La Plateforme.': 'У вас нет активной подписки на La Plateforme.',
  'You have no API key yet. Generate one to start using the API.': 'У вас пока нет ключа API. Сгенерируйте его, чтобы начать использовать API.',
  'You will lose access to the features listed above.': 'Вы потеряете доступ к перечисленным выше функциям.',
  'Your Agents': 'Ваши агенты',
  'Your future invoices will be showed here.': 'Ваши будущие счета будут отображаться здесь.',
  'Your organization identifier.': 'Идентификатор вашей организации.',
  'Your personal AI assistant for life and work.': 'Ваш персональный помощник на основе ИИ для жизни и работы.',
  'Your personal identifier.': 'Ваш персональный идентификатор.',
  'Your student email is not recognised?': 'Ваша студенческая почта не распознана?',
  'Your trusted sidekicks for automating tasks and supercharging productivity.': 'Ваши надежные помощники для автоматизации задач и повышения продуктивности.',
  'Z.ai is a frontier AI company focused on developing next-generation cognitive large models, with the vision of enabling machines to think like humans. Since 2 Newton, Z.ai has released multiple families of models—including GLM, ChatGLM, and CogVideoX—spanning key domains such as language, vision, multimodality, speech, and AI agents. We have open-sourced several flagship models, including GLM-130B (bilingual with 130B parameters), ChatGLM-6B (locally deployable), and GLM-4V-9B (multimodal). These models have been downloaded over 30 million times worldwide. Since 2024, Z.ai has entered the GLM-4 era, achieving new breakthroughs in reasoning model, multimodal generation, and autonomous AI agents.': 'Z.ai — передовая компания в области искусственного интеллекта, которая занимается разработкой когнитивных больших моделей нового поколения с целью научить машины мыслить как люди. С 2020 года Z.ai выпустила несколько семейств моделей — включая GLM, ChatGLM и CogVideoX — охватывающих ключевые области: язык, зрение, мультимодальность, речь и ИИ‑агенты. Мы открыли исходный код нескольких флагманских моделей, включая GLM‑130B (двуязычная, 130 млрд параметров), ChatGLM‑6B (для локального развёртывания) и GLM‑4V‑9B (мультимодальная). Эти модели были скачаны более 30 миллионов раз по всему миру. С 2024 года Z.ai вступила в эру GLM‑4, добившись новых прорывов в моделях рассуждения, мультимодальной генерации и автономных ИИ‑агентах.',
  'Zero data-retention': 'Отсутствие хранения данных',
  'Zero data-retention is disabled': 'Функция отсутствия хранения данных отключена',
  'Zero data-retention is disabled for this organization. Troubleshooting and analytics data can be stored. Contact our sales to enable this option.': 'Функция отсутствия хранения данных отключена для этой организации. Данные для устранения неполадок и аналитики могут храниться. Обратитесь в отдел продаж, чтобы включить эту опцию.',
  'Всё, что передается, анонимизируется.': 'Всё передаваемое анонимизируется.',
  // --- Дополнение 2 (30.10.2026, вечер): меню «+», расписание, общие строки ---
  'Local files': 'Локальные файлы',
  'Local file': 'Локальный файл',
  'Back': 'Назад',
  'Next': 'Далее',
  'Done': 'Готово',
  'All files': 'Все файлы',
  'Recent': 'Недавние',
  'Starred': 'Избранное',
  'My files': 'Мои файлы',
  'Upload from': 'Загрузить из',
  'Google Drive': 'Google Диск',
  'Sign out': 'Выйти',
  'Invite': 'Пригласить',
  'Storage': 'Хранилище',
  'Attachments': 'Вложения',
  'Attach files': 'Прикрепить файлы',
  'Attach file': 'Прикрепить файл',
  'Add photos': 'Добавить фото',
  'Take screenshot': 'Сделать снимок экрана',
  'Screenshot': 'Снимок экрана',
  'Scheduled tasks': 'Запланированные задачи',
  'New task': 'Новая задача',
  'Run now': 'Запустить сейчас',
  'Pause': 'Пауза',
  'Resume': 'Возобновить',
  'History': 'История',
  'Activity': 'Активность',
  'Untitled': 'Без названия',
  'Untitled project': 'Проект без названия',
  'Untitled chat': 'Чат без названия',
  'Loading': 'Загрузка',
  'Loading...': 'Загрузка…',
  'No results': 'Ничего не найдено',
  'Nothing here': 'Здесь пока ничего нет',
  'Try again': 'Попробовать снова',
  'Welcome back': 'С возвращением',
  'Quick actions': 'Быстрые действия',
  'Templates': 'Шаблоны',
  'Cases': 'Сценарии',
  'Skills': 'Навыки',
  'Integrations': 'Интеграции',
  'Connected': 'Подключено',
  'Disconnect': 'Отключить',
  'Manage': 'Управление',
  'Configure': 'Настроить',
  // Готовые сценарии на странице «Расписание»
  'Competitor pricing weekly': 'Цены конкурентов — еженедельно',
  "Compare this week's pricing and plan changes of leading AI products": 'Сравнение цен и тарифов ведущих ИИ-продуктов на этой неделе',
  'Weekly report draft': 'Черновик еженедельного отчёта',
  "Draft a ready-to-paste weekly report from this week's chats": 'Готовый еженедельный отчёт из чатов этой недели',
  'Learning card: Agent products': 'Обучающая карточка: продукты-агенты',
  'Create a 5-minute learning card on an Agent feature': 'Пятиминутная обучающая карточка о возможностях агентов',
  'Website copy audit': 'Аудит текстов сайта',
  'Find plan and price mismatches between our website and docs': 'Поиск расхождений по тарифам и ценам между сайтом и документацией',
  'Plugin & connection health check': 'Проверка плагинов и подключений',
  'Check enabled connections and plugins for issues': 'Проверка включённых подключений и плагинов на наличие проблем',
  'Morning workspace digest': 'Утренняя сводка рабочего пространства',
  "Summarize today's to-dos, scheduled tasks and open chats": 'Сводка задач на сегодня, запланированных дел и открытых чатов',
  };

  // ==========================================
  // ДИНАМИЧЕСКИЕ СТРОКИ (ШАБЛОНЫ)
  // ==========================================
  // Строки с переменными частями (время, числа) невозможно перевести по
  // точному совпадению: «Every Monday at 09:30» уникально для каждого
  // времени. Для них применяются регулярные выражения с функцией сборки
  // русского текста (с правильными формами слов).
  var WEEKDAY_ACC = {
    'Monday': 'Каждый понедельник',
    'Tuesday': 'Каждый вторник',
    'Wednesday': 'Каждую среду',
    'Thursday': 'Каждый четверг',
    'Friday': 'Каждую пятницу',
    'Saturday': 'Каждую субботу',
    'Sunday': 'Каждое воскресенье'
  };

  // Русское склонение счётных существительных: 1 чат, 2 чата, 5 чатов.
  function pluralRu(n, forms) {
    var mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
    return forms[2];
  }

  var COUNTABLES = {
    'chat': ['чат', 'чата', 'чатов'],
    'chats': ['чат', 'чата', 'чатов'],
    'project': ['проект', 'проекта', 'проектов'],
    'projects': ['проект', 'проекта', 'проектов'],
    'task': ['задача', 'задачи', 'задач'],
    'tasks': ['задача', 'задачи', 'задач'],
    'file': ['файл', 'файла', 'файлов'],
    'files': ['файл', 'файла', 'файлов'],
    'message': ['сообщение', 'сообщения', 'сообщений'],
    'messages': ['сообщение', 'сообщения', 'сообщений'],
    'credit': ['кредит', 'кредита', 'кредитов'],
    'credits': ['кредит', 'кредита', 'кредитов'],
    'prompt': ['запрос', 'запроса', 'запросов'],
    'prompts': ['запрос', 'запроса', 'запросов']
  };

  var COUNTABLE_RE = (function () {
    var keys = [];
    for (var k in COUNTABLES) keys.push(k);
    return new RegExp('^(\\d+)\\s+(' + keys.join('|') + ')$');
  })();

  var PATTERNS = [
    // «Every Monday at 09:30» -> «Каждый понедельник в 09:30»
    { re: /^Every (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) at (\d{1,2}[:.]\d{2})$/,
      fn: function (m) { return WEEKDAY_ACC[m[1]] + ' в ' + m[2]; } },
    // «Weekdays at 08:30» -> «По будням в 08:30»
    { re: /^Weekdays at (\d{1,2}[:.]\d{2})$/,
      fn: function (m) { return 'По будням в ' + m[1]; } },
    // «Weekends at 09:00» -> «По выходным в 09:00»
    { re: /^Weekends at (\d{1,2}[:.]\d{2})$/,
      fn: function (m) { return 'По выходным в ' + m[1]; } },
    // «Every day at 09:00» -> «Каждый день в 09:00»
    { re: /^Every day at (\d{1,2}[:.]\d{2})$/,
      fn: function (m) { return 'Каждый день в ' + m[1]; } },
    // «- 5 remaining today» -> «- Осталось 5 на сегодня»
    { re: /^- (\d+) remaining today$/,
      fn: function (m) { return '- Осталось ' + m[1] + ' на сегодня'; } },
    // «5 remaining today» -> «Осталось 5 на сегодня»
    { re: /^(\d+) remaining today$/,
      fn: function (m) { return 'Осталось ' + m[1] + ' на сегодня'; } },
    // «5 chats» / «2 projects» и т.п. -> со склонением: «5 чатов», «2 проекта»
    { re: COUNTABLE_RE,
      fn: function (m) { return m[1] + ' ' + pluralRu(parseInt(m[1], 10), COUNTABLES[m[2]]); } }
  ];

  // ==========================================
  // ОНЛАЙН-АВТОПЕРЕВОДЧИК
  // ==========================================
  // Строки интерфейса, которых нет в словаре, отправляются в бесплатный
  // сервис перевода (без ключей и регистрации). Результат сохраняется в
  // localStorage: каждая строка переводится ОДИН раз, дальше — мгновенно
  // из кэша, даже без интернета.
  // НИКОГДА не отправляются: сообщения чата, код, markdown, вводимые тексты,
  // строки с русскими буквами, ссылки, e-mail, названия моделей ИИ.
  var MT = {
    maxLen: 120,     // не отправляем строки длиннее 120 символов
    maxTotal: 300,   // не более 300 запросов за один запуск приложения
    sent: 0,
    cache: null,     // en -> ru, загружается из localStorage при старте
    pending: {},     // очередь строк на перевод
    flushTimer: null,
    // Пользовательский контент (названия чатов, переписка) не отправляем:
    skipSelector: [
      'textarea', 'input', '[contenteditable]', 'pre', 'code',
      '[class*="markdown"]', '[class*="Markdown"]',
      '[class*="chat-item"]', '[class*="chatItem"]',
      '[class*="conversation"]', '[class*="session"]',
      '[class*="history-item"]', '[class*="message"]', '[class*="Message"]'
    ].join(',')
  };

  function mtStorage() {
    try { return window.localStorage; } catch (e) { return null; }
  }

  function mtLoadCache() {
    var st = mtStorage();
    if (!st) return {};
    try { return JSON.parse(st.getItem('zai-ru-mt-v1') || '{}') || {}; }
    catch (e) { return {}; }
  }

  function mtSaveCache() {
    var st = mtStorage();
    if (!st) return;
    try {
      // Не даём кэшу расти бесконечно: при переполнении удаляем старую четверть
      var keys = Object.keys(MT.cache);
      if (keys.length > 800) {
        keys.slice(0, 200).forEach(function (k) { delete MT.cache[k]; });
      }
      st.setItem('zai-ru-mt-v1', JSON.stringify(MT.cache));
    } catch (e) { /* приватный режим — кэш только в памяти */ }
  }

  // Что точно НЕ нужно отправлять переводчику
  var MT_NOT_SENDABLE = [
    /^[^A-Za-z]*$/,                                    // нет латинских букв
    /[А-Яа-яЁё]/,                                      // уже есть русские буквы
    /https?:\/\/|www\.|[\w.+-]+@[\w.-]+/,             // ссылки и e-mail
    /^(glm|gpt|k[0-9]|o[134]|claude|gemini|deepseek|qwen|llama|kimi|doubao|grok|mistral)[\w.+-]*$/i, // модели ИИ
    /^[\d\s.,:;()\[\]{}\-+_=#%&*$€¥£?!/\\|<>~^'"`]+$/  // цифры и знаки
  ];

  function mtCanSend(text) {
    if (!AUTO_TRANSLATE_ONLINE) return false;
    if (MT.sent >= MT.maxTotal) return false;
    if (!text || text.length > MT.maxLen) return false;
    for (var i = 0; i < MT_NOT_SENDABLE.length; i++) {
      if (MT_NOT_SENDABLE[i].test(text)) return false;
    }
    return true;
  }

  function mtQueue(text, node) {
    if (!mtCanSend(text)) return;
    var st = mtStorage();
    if (st && st.getItem('zai-ru-mt') === 'off') return; // аварийное отключение
    if (MT.cache[text]) {
      // Перевод уже выучен — применяем сразу
      try { node.nodeValue = node.nodeValue.replace(text, MT.cache[text]); } catch (e) {}
      return;
    }
    // Не трогаем пользовательский контент (названия чатов и т.п.)
    try {
      if (node.parentElement && node.parentElement.closest(MT.skipSelector)) return;
    } catch (e) { /* селектор валиден */ }
    if (!MT.pending[text]) MT.pending[text] = [];
    if (MT.pending[text].indexOf(node) === -1 && MT.pending[text].length < 5) {
      MT.pending[text].push(node);
    }
    if (!MT.flushTimer) MT.flushTimer = setTimeout(mtFlush, 1200);
  }

  function mtFlush() {
    MT.flushTimer = null;
    var texts = [];
    for (var t in MT.pending) {
      texts.push(t);
      if (texts.length >= 10) break; // пачками по 10 строк
    }
    texts.forEach(function (t) { mtRequest(t); });
  }

  function mtRequest(text) {
    var nodes = MT.pending[text] || [];
    delete MT.pending[text];
    if (!nodes.length) return;
    MT.sent++;
    mtTryProviders(text, nodes, 0);
  }

  // Источники перевода: если первый недоступен, пробуем второй.
  var MT_PROVIDERS = [
    // 1. Google Translate — открытый бесплатный эндпоинт, без ключа
    function (text, cb) {
      fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ru&dt=t&q=' +
        encodeURIComponent(text))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          try {
            if (!d || !d[0]) return cb(null);
            var out = '';
            for (var i = 0; i < d[0].length; i++) {
              if (d[0][i] && d[0][i][0]) out += d[0][i][0];
            }
            cb(out.trim() || null);
          } catch (e) { cb(null); }
        })
        .catch(function () { cb(null); });
    },
    // 2. MyMemory — открытая переводческая память, без ключа
    function (text, cb) {
      fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|ru')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          try {
            var t = d && d.responseData && d.responseData.translatedText;
            if (t && /MYMEMORY WARNING/i.test(t)) return cb(null);
            cb(t || null);
          } catch (e) { cb(null); }
        })
        .catch(function () { cb(null); });
    }
  ];

  function mtTryProviders(text, nodes, idx) {
    if (idx >= MT_PROVIDERS.length) return; // все недоступны — тихо пропускаем
    MT_PROVIDERS[idx](text, function (ru) {
      if (ru && ru !== text) {
        MT.cache[text] = ru;
        mtSaveCache();
        nodes.forEach(function (n) {
          try { n.nodeValue = n.nodeValue.replace(text, ru); } catch (e) {}
        });
      } else {
        mtTryProviders(text, nodes, idx + 1);
      }
    });
  }

  // ==========================================
  // УДАЛЁННЫЙ СЛОВАРЬ (ОБНОВЛЕНИЕ БЕЗ ПЕРЕСБОРКИ)
  // ==========================================
  // Файл inject/dictionary.json подтягивается с вашего GitHub при каждом
  // запуске приложения. Дополнили файл на GitHub → перезапустили приложение
  // → новые переводы на месте. Пересборка .dmg больше НЕ требуется.
  function applyRemoteDict(json) {
    if (!json || typeof json !== 'object') return 0;
    var added = 0;
    for (var k in json) {
      if (!k || k.charAt(0) === '_') continue; // служебные ключи пропускаем
      if (typeof json[k] === 'string' && json[k] && !DICT[k]) {
        DICT[k] = json[k];
        added++;
      }
    }
    return added;
  }

  function loadRemoteDict() {
    var repo = REMOTE_DICT_REPO || '';
    if (repo.indexOf('__REMOTE_DICT_REPO__') !== -1) return; // не подставлено — отключено
    var st = mtStorage();
    var branches = ['master', 'main'];
    var attempt = function (i) {
      if (i >= branches.length) {
        // Нет сети? Применяем сохранённую копию словаря
        if (st) {
          try {
            var saved = JSON.parse(st.getItem('zai-ru-remote-dict') || 'null');
            if (saved && applyRemoteDict(saved)) scheduleTranslation();
          } catch (e) { /* повреждённый кэш — игнорируем */ }
        }
        return;
      }
      fetch('https://raw.githubusercontent.com/' + repo + '/' + branches[i] +
            '/inject/dictionary.json?t=' + Date.now())
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (json) {
          var added = applyRemoteDict(json);
          if (st) { try { st.setItem('zai-ru-remote-dict', JSON.stringify(json)); } catch (e) {} }
          if (added) scheduleTranslation();
          console.log('[Z.ai Desktop] Удалённый словарь: добавлено записей — ' + added);
        })
        .catch(function () { attempt(i + 1); });
    };
    attempt(0);
  }

  // ==========================================
  // ДВИЖОК ПЕРЕВОДА
  // ==========================================
  // Переводим ТОЛЬКО статические элементы интерфейса: точное совпадение
  // текстового узла со словарём. Сообщения чата, код и ввод пользователя
  // не затрагиваются (исключаются селектором SKIP_SELECTOR).
  var SKIP_SELECTOR = [
    'script', 'style', 'noscript', 'template', 'iframe', 'canvas', 'svg', 'math',
    'pre', 'code', 'kbd', 'samp', 'textarea', 'input', 'select',
    '[contenteditable="true"]', '[contenteditable=""]',
    '[contenteditable="plaintext-only"]',
    '.markdown-body', '[class*="markdown"]', '[class*="Markdown"]',
    '[class*="katex"]', '[class*="hljs"]'
  ].join(',');

  // Для атрибутов (placeholder и т.п.) поля ввода НЕ пропускаем:
  // placeholder — это текст интерфейса, а не содержимое пользователя.
  var ATTR_SKIP_SELECTOR = [
    'script', 'style', 'noscript', 'template', 'pre', 'code', 'kbd', 'samp',
    '.markdown-body', '[class*="markdown"]', '[class*="Markdown"]',
    '[class*="katex"]', '[class*="hljs"]'
  ].join(',');

  var TRANSLATE_ATTRS = ['placeholder', 'title', 'aria-label', 'data-tooltip'];
  var MAX_NODE_TEXT = 800; // длинные узлы (markdown) не проверяем
  var applying = false;
  var timer = null;

  function lookup(text) {
    if (!text) return null;
    var ru = DICT[text];
    if (ru) return ru;
    var collapsed = text.replace(/\s+/g, ' ');
    if (collapsed !== text) {
      ru = DICT[collapsed];
      if (ru) return ru;
    }
    // Типографский апостроф (’) встречается в надписях вида «this week’s».
    // Сводим его к обычному и ищем ещё раз.
    var normalized = collapsed.replace(/[\u2018\u2019\u02BC]/g, "'");
    if (normalized !== collapsed) {
      ru = DICT[normalized];
      if (ru) return ru;
    }
    // Динамические строки (время расписания, счётчики) — по шаблонам.
    for (var i = 0; i < PATTERNS.length; i++) {
      var m = collapsed.match(PATTERNS[i].re);
      if (m) {
        try { return PATTERNS[i].fn(m); } catch (e) { return null; }
      }
    }
    // 4. Выученные строки онлайн-переводчика.
    if (MT.cache) {
      ru = MT.cache[collapsed];
      if (ru) return ru;
    }
    return null;
  }

  function isSkippable(node) {
    var parent = node.parentElement;
    if (!parent) return true;
    try {
      if (parent.closest(SKIP_SELECTOR)) return true;
    } catch (e) { /* селектор всегда валиден */ }
    return false;
  }

  function translateTextNodes(root) {
    var count = 0;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var v = n.nodeValue;
        if (!v || !v.trim() || v.length > MAX_NODE_TEXT) return NodeFilter.FILTER_REJECT;
        if (isSkippable(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var current;
    while ((current = walker.nextNode())) nodes.push(current);
    for (var i = 0; i < nodes.length; i++) {
      var raw = nodes[i].nodeValue;
      var trimmed = raw.trim();
      var ru = lookup(trimmed);
      if (ru && ru !== trimmed) {
        nodes[i].nodeValue = raw.replace(trimmed, function () { return ru; });
        count++;
      } else if (ru === null) {
        // В словаре нет — ставим в очередь онлайн-переводчику
        mtQueue(trimmed, nodes[i]);
      }
    }
    return count;
  }

  function translateAttributes(root) {
    var count = 0;
    var selector = TRANSLATE_ATTRS.map(function (a) { return '[' + a + ']'; }).join(',');
    var elements;
    try {
      elements = root.querySelectorAll(selector);
    } catch (e) {
      return 0;
    }
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.closest && el.closest(ATTR_SKIP_SELECTOR)) continue;
      for (var j = 0; j < TRANSLATE_ATTRS.length; j++) {
        var attr = TRANSLATE_ATTRS[j];
        var value = el.getAttribute(attr);
        if (!value) continue;
        var trimmed = value.trim();
        var ru = lookup(trimmed);
        if (ru && ru !== trimmed) {
          el.setAttribute(attr, value.replace(trimmed, function () { return ru; }));
          count++;
        }
      }
    }
    return count;
  }

  function runTranslation() {
    if (!document.body) return;
    applying = true;
    try {
      var texts = translateTextNodes(document.body);
      var attrs = translateAttributes(document.body);
      if (texts || attrs) {
        console.log('[Z.ai Desktop] Локализация: переведено текстов — ' + texts +
          ', атрибутов — ' + attrs);
      }
    } catch (e) {
      console.warn('[Z.ai Desktop] Ошибка локализации:', e);
    } finally {
      applying = false;
    }
  }

  function scheduleTranslation(delay) {
    clearTimeout(timer);
    timer = setTimeout(runTranslation, delay || 120);
  }

  // ==========================================
  // СКРЫТИЕ НАВИГАЦИИ САЙТА
  // ==========================================
  var CONFIG = {
    titleBarHeight: 38,
    selectorsToHide: [
      'header', '.nav-header', '.top-header', '.app-header', '.page-header',
      '.navbar', '.top-nav', '.app-nav', '.main-header',
      '[role="banner"]',
      '[data-testid*="header"]', '[data-testid*="nav"]',
      '[aria-label*="navigation"]', '[aria-label*="header"]'
    ]
  };

  function hideNavigationElements() {
    CONFIG.selectorsToHide.forEach(function (selector) {
      try {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el) {
          if (el && el.style.display !== 'none') {
            el.style.display = 'none';
            el.dataset.zaiHidden = 'true';
          }
        });
      } catch (e) { /* пропускаем невалидные селекторы */ }
    });
  }

  function adjustLayout() {
    if (document.body) {
      document.body.style.paddingTop = CONFIG.titleBarHeight + 'px';
    }
    var mainContainers = document.querySelectorAll(
      '#main, .app-container, .chat-container, .main-container, .content-wrapper'
    );
    mainContainers.forEach(function (container) {
      if (container) {
        container.style.paddingTop = '0';
        container.style.marginTop = '0';
      }
    });
  }

  function markAsEnhanced() {
    if (document.body && !document.body.classList.contains('zai-enhanced')) {
      document.body.classList.add('zai-enhanced');
    }
  }

  // ==========================================
  // НАБЛЮДАТЕЛЬ ИЗМЕНЕНИЙ DOM
  // ==========================================
  // SPA (React) постоянно перерисовывает интерфейс: после каждой перерисовки
  // перевод применяется заново. Собственные изменения переводчика игнорируются
  // (флаг applying), поэтому зацикливание невозможно.
  function initMutationObserver() {
    var observer = new MutationObserver(function () {
      if (!applying) scheduleTranslation();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
    return observer;
  }

  // ==========================================
  // ГОРЯЧИЕ КЛАВИШИ
  // ==========================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      // F5 или Ctrl+R — обновление страницы (стандартное поведение)
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        return;
      }
      // Escape — закрыть модальные окна
      if (e.key === 'Escape') {
        var modals = document.querySelectorAll(
          '[role="dialog"], .modal, .popup, [data-testid*="modal"]'
        );
        modals.forEach(function (modal) {
          var closeBtn = modal.querySelector(
            '[aria-label*="close"], .close, [data-testid*="close"]'
          );
          if (closeBtn) {
            closeBtn.click();
          }
        });
      }
    });
  }

  // ==========================================
  // ИНИЦИАЛИЗАЦИЯ
  // ==========================================
  function init() {
    console.log('[Z.ai Desktop] Скрипт интерфейса загружен (русская локализация)');
    MT.cache = mtLoadCache();
    loadRemoteDict();
    markAsEnhanced();
    hideNavigationElements();
    adjustLayout();
    runTranslation();
    initMutationObserver();
    initKeyboardShortcuts();
    // Повторные проходы для медленной загрузки SPA
    setTimeout(function () {
      hideNavigationElements();
      adjustLayout();
      runTranslation();
    }, 500);
    setTimeout(function () {
      hideNavigationElements();
      adjustLayout();
      runTranslation();
    }, 2000);
    console.log('[Z.ai Desktop] Скрипт интерфейса инициализирован');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', function () {
    hideNavigationElements();
    adjustLayout();
    runTranslation();
  });
})();
