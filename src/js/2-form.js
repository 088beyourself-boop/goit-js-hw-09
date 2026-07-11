// 1.Оголошуемо об'єкт поза formData поза функціями
let formData = { email: '', message: '' };

// 2.Знаходимо форму в Dom та задаємо ключ для сховища
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = '.feedback-form';

// 3. Перевірка сховища при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  // Якщо дані є, розпаковуємо їх з JSON
  formData = JSON.parse(savedData);
  // Заповнюємо поля форми (якщо значення немає, ставимо порожній рядок, щоб уникнути undefined)
  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
}

// 4. Відстеження вводу через делегування (подія 'input')
form.addEventListener('input', event => {
  // Отримуємо ім'я поля (email або message) та його значення
  const key = event.target.name;
  const value = event.target.value.trim(); // Відразу прибираємо пробіли по краях

  // Оновлюємо відповідне поле в об'єкті formData
  formData[key] = value;

  // Записуємо оновлений об'єкт у локальне сховище у форматі рядка
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 5. Обробка відправлення форми (подія 'submit')
form.addEventListener('submit', event => {
  // Забороняємо стандартне перезавантаження сторінки
  event.preventDefault();

  // Перевіряємо, чи обидва поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return; // Зупиняємо виконання, якщо є порожні поля
  }

  // Якщо все добре, виводимо об'єкт у консоль
  console.log(formData);

  // Очищаємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт formData
  formData = { email: '', message: '' };

  // Очищаємо саму форму
  form.reset();
});
