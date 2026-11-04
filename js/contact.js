/* ==========================================================
   КОНТАКТНАЯ ФОРМА — Formspree (японская и русская версии).
   Отправка без перехода на другую страницу.
   Сообщения об ошибках показывают причину, если сервис её сообщил.
   ========================================================== */

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-form-status");

if (contactForm && contactStatus) {
  const isRussian = document.documentElement.lang.toLowerCase().startsWith("ru");
  const messages = isRussian
    ? {
        sending: "Отправляем сообщение…",
        success: "Спасибо! Ваше сообщение отправлено. Я свяжусь с вами по электронной почте.",
        error: "Не удалось отправить сообщение. Попробуйте ещё раз позже.",
        network: "Не удалось связаться с сервисом отправки. Проверьте интернет и попробуйте ещё раз.",
        rateLimit: "Слишком много отправок за короткое время. Попробуйте позже.",
        rejected: "Сервис отклонил сообщение. Проверьте данные формы и настройки Formspree.",
        configuration: "Форма временно недоступна. Попробуйте связаться со мной позже.",
      }
    : {
        sending: "送信しています…",
        success: "お問い合わせありがとうございます。メッセージを送信しました。メールにてご連絡いたします。",
        error: "送信できませんでした。時間をおいて再度お試しください。",
        network: "送信サービスに接続できませんでした。通信環境をご確認のうえ、再度お試しください。",
        rateLimit: "短時間に送信が集中しています。時間をおいて再度お試しください。",
        rejected: "送信が受け付けられませんでした。入力内容とフォームの設定をご確認ください。",
        configuration: "現在フォームをご利用いただけません。時間をおいて再度お試しください。",
      };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton?.disabled) return;

    const endpoint = contactForm.getAttribute("action");
    if (!endpoint) {
      contactStatus.textContent = messages.configuration;
      return;
    }

    if (submitButton) submitButton.disabled = true;
    contactStatus.textContent = messages.sending;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        let details = "";
        try {
          const result = await response.json();
          details = Array.isArray(result.errors)
            ? result.errors.map((item) => item.message || "").filter(Boolean).join("; ")
            : typeof result.error === "string" ? result.error : "";
        } catch (_) {
          /* Иногда сервер возвращает ответ, который не является JSON. */
        }
        console.error("Formspree: ошибка HTTP", response.status, details);
        contactStatus.textContent = response.status === 429
          ? messages.rateLimit
          : response.status === 400 || response.status === 403 || response.status === 422
            ? messages.rejected
            : `${messages.error} (HTTP ${response.status})`;
        return;
      }

      contactForm.reset();
      contactStatus.textContent = messages.success;
    } catch (error) {
      console.error("Formspree: ошибка соединения или ограничение браузера", error);
      contactStatus.textContent = messages.network;
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
