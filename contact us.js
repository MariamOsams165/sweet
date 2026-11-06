// جافا سكريبت للتعامل مع النموذج وتفاعلات الصفحة
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. التعامل مع إرسال النموذج (Form Submission)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // منع الصفحة من إعادة التحميل عند إرسال النموذج
            event.preventDefault();
            
            // الحصول على قيم المدخلات
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // تحقق بسيط (يمكن إضافة تحقق أكثر تعقيداً هنا)
            if (name && email && message) {
                // عرض رسالة نجاح بسيطة
                // في التطبيق الحقيقي، هنا ستقوم بإرسال البيانات إلى خادم
                alert(`Thank you, ${name}! Your message has been sent. We will get back to you at ${email} soon.`);
                
                // إعادة تعيين النموذج (مسح الحقول)
                contactForm.reset();
            } else {
                alert('Please fill out all fields before sending your message.');
            }
        });
    }

    // 2. التعامل مع زر "Get Directions"
    const directionsBtn = document.querySelector('.get-directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function() {
            // رابط خرائط جوجل لموقع المخبز (يمكن استبداله بالعنوان الحقيقي)
            const mapUrl = "https://www.google.com/maps/dir//123+Sweet+Street,+Cairo,+Egypt";
            // فتح الرابط في تبويب جديد
            window.open(mapUrl, '_blank');
        });
    }

    // 3. التعامل مع زر "Order Now"
    const orderBtn = document.querySelector('.order-now-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            // توجيه المستخدم إلى صفحة القائمة أو الطلب (يجب استبدال الرابط)
            alert('Redirecting to the Order Menu page!');
            // window.location.href = 'menu.html';
        });
    }
});