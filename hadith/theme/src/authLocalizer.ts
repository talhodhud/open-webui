export function localizeAuthPage() {
  if (!location.pathname.startsWith('/auth')) return;

  // Set page tab title
  if (!document.title.includes('بيان السنة')) {
    document.title = 'بيان السنة — تسجيل الدخول';
  }

  // Ensure default locale in localStorage is set to Arabic if unset or English
  try {
    const loc = localStorage.getItem('locale');
    if (!loc || loc === 'en-US' || loc === 'en') {
      localStorage.setItem('locale', 'ar-BH');
    }
  } catch {}

  const card = document.getElementById('auth-login-card');
  if (!card) return;

  if (card.getAttribute('dir') !== 'rtl') {
    card.setAttribute('dir', 'rtl');
  }

  // 1. Heading
  const heading =
    card.querySelector<HTMLElement>('form > div.mb-1 > div.text-2xl') ||
    card.querySelector<HTMLElement>('.text-2xl');
  if (heading) {
    const txt = heading.textContent || '';
    if (txt.includes('Sign up') || txt.includes('سجّل في') || txt.includes('Create Account')) {
      if (heading.textContent !== 'إنشاء حساب في بيان السنة') {
        heading.textContent = 'إنشاء حساب في بيان السنة';
      }
    } else if (txt.includes('Get started') || txt.includes('ابدأ')) {
      if (heading.textContent !== 'ابدأ مع بيان السنة') {
        heading.textContent = 'ابدأ مع بيان السنة';
      }
    } else if (txt.includes('LDAP')) {
      if (heading.textContent !== 'تسجيل الدخول عبر LDAP — بيان السنة') {
        heading.textContent = 'تسجيل الدخول عبر LDAP — بيان السنة';
      }
    } else {
      if (heading.textContent !== 'تسجيل الدخول إلى بيان السنة') {
        heading.textContent = 'تسجيل الدخول إلى بيان السنة';
      }
    }
  }

  // 2. Info banner / disclaimer
  const notice = card.querySelector<HTMLElement>('form > div.mb-1 > div.text-xs');
  if (notice) {
    const targetNotice = 'ⓘ بيان السنة يعمل محليًا بالكامل وتبقى بياناتك محفوظة بأمان على خادمك.';
    if (notice.textContent !== targetNotice) {
      notice.textContent = targetNotice;
    }
  }

  // 3. Email field
  const emailLabel = card.querySelector<HTMLElement>('label[for="email"]');
  if (emailLabel && emailLabel.textContent !== 'البريد الإلكتروني') {
    emailLabel.textContent = 'البريد الإلكتروني';
  }
  const emailInput = card.querySelector<HTMLInputElement>('input#email');
  if (emailInput && emailInput.placeholder !== 'أدخل البريد الإلكتروني') {
    emailInput.placeholder = 'أدخل البريد الإلكتروني';
  }

  // 4. Password field
  const pwdLabel = card.querySelector<HTMLElement>('label[for="password"]:not(.sr-only)');
  if (pwdLabel && pwdLabel.textContent !== 'كلمة المرور') {
    pwdLabel.textContent = 'كلمة المرور';
  }
  const pwdSr = card.querySelector<HTMLElement>('label.sr-only[for="password"]');
  if (pwdSr && pwdSr.textContent !== 'أدخل كلمة المرور') {
    pwdSr.textContent = 'أدخل كلمة المرور';
  }
  const pwdInput = card.querySelector<HTMLInputElement>('input#password');
  if (pwdInput && pwdInput.placeholder !== 'أدخل كلمة المرور') {
    pwdInput.placeholder = 'أدخل كلمة المرور';
  }
  const pwdToggle = card.querySelector<HTMLButtonElement>(
    'button[aria-label*="password" i], button[aria-label*="كلمة المرور"]'
  );
  if (pwdToggle) {
    const isVisible = pwdToggle.getAttribute('aria-pressed') === 'true';
    pwdToggle.setAttribute('aria-label', isVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور');
  }

  // 5. Name field (Signup)
  const nameLabel = card.querySelector<HTMLElement>('label[for="name"]');
  if (nameLabel && nameLabel.textContent !== 'الاسم') {
    nameLabel.textContent = 'الاسم';
  }
  const nameInput = card.querySelector<HTMLInputElement>('input#name');
  if (nameInput && nameInput.placeholder !== 'أدخل اسمك الكامل') {
    nameInput.placeholder = 'أدخل اسمك الكامل';
  }

  // 6. Confirm Password (Signup)
  const confirmPwdLabel = card.querySelector<HTMLElement>('label[for="confirm-password"]');
  if (confirmPwdLabel && confirmPwdLabel.textContent !== 'تأكيد كلمة المرور') {
    confirmPwdLabel.textContent = 'تأكيد كلمة المرور';
  }
  const confirmPwdInput = card.querySelector<HTMLInputElement>('input#confirm-password');
  if (confirmPwdInput && confirmPwdInput.placeholder !== 'أدخل تأكيد كلمة المرور') {
    confirmPwdInput.placeholder = 'أدخل تأكيد كلمة المرور';
  }

  // 7. Username (LDAP)
  const usernameLabel = card.querySelector<HTMLElement>('label[for="username"]');
  if (usernameLabel && usernameLabel.textContent !== 'اسم المستخدم') {
    usernameLabel.textContent = 'اسم المستخدم';
  }
  const usernameInput = card.querySelector<HTMLInputElement>('input#username');
  if (usernameInput && usernameInput.placeholder !== 'أدخل اسم المستخدم') {
    usernameInput.placeholder = 'أدخل اسم المستخدم';
  }

  // 8. Submit button
  const submitBtn = card.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (submitBtn) {
    const btnText = submitBtn.querySelector<HTMLElement>('.self-center') || submitBtn;
    const cur = (btnText.textContent || '').trim();
    if (cur.includes('Create') || cur.includes('إنشاء') || cur.includes('حساب')) {
      if (btnText.textContent !== 'إنشاء حساب') btnText.textContent = 'إنشاء حساب';
    } else {
      if (btnText.textContent !== 'تسجيل الدخول') btnText.textContent = 'تسجيل الدخول';
    }
  }

  // 9. Switcher between sign in and sign up
  const switchBox = card.querySelector<HTMLElement>('div.mt-4.text-sm.text-center') || card.querySelector<HTMLElement>('div.text-sm.text-center');
  if (switchBox) {
    const btn = switchBox.querySelector<HTMLButtonElement>('button');
    if (btn) {
      const bText = btn.textContent?.trim() || '';
      if (bText === 'Sign up' || bText === 'تسجيل' || bText === 'إنشاء حساب') {
        if (switchBox.childNodes[0]?.nodeType === Node.TEXT_NODE) {
          switchBox.childNodes[0].textContent = 'ليس لديك حساب؟ ';
        }
        if (btn.textContent !== 'إنشاء حساب') btn.textContent = 'إنشاء حساب';
      } else if (bText === 'Sign in' || bText === 'تسجيل الدخول') {
        if (switchBox.childNodes[0]?.nodeType === Node.TEXT_NODE) {
          switchBox.childNodes[0].textContent = 'لديك حساب بالفعل؟ ';
        }
        if (btn.textContent !== 'تسجيل الدخول') btn.textContent = 'تسجيل الدخول';
      }
    }
  }

  // 10. Logo
  const logo = card.querySelector<HTMLImageElement>('img#logo');
  if (logo && logo.alt !== 'شعار بيان السنة') {
    logo.alt = 'شعار بيان السنة';
  }
}
