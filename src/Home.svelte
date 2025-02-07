<script>
    import ELMOSTime_logo from "./assets/ELMOSTime_Persian.png";
    import { Link } from "svelte-routing";
</script>

<div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto" style="max-height: 100%;">
    <img src={ELMOSTime_logo} />
    <h3 class="text-xl font-semibold text-center text-gray-700 mb-6">
        برای استفاده لطفا
        <Link to="/login">وارد حساب خود شوید</Link>
        یا
        <Link to="/register">ثبت نام کنید</Link>         

    </h3>
    <p class="text-gray-500 text-right mb-2" dir="rtl">
        ایده گرفته از 
        <a href="https://elmos-vahed.ir">
            علموص واحد
        </a>
    </p>
    <p class="text-gray-500 text-right mb-2" dir="rtl">
        با معرفی عملوص تایم به دوستان خود از ما حمایت کنید
    </p>
    <p class="text-gray-500 text-right mb-2" dir="rtl">
        با ستاره دادن به 
        <a href="https://github.com/MohammadYSF/elmostime">این</a>
        و
        <a href="https://github.com/MohammadYSF/golestan_scrape">این</a>
        مخازن گیتهاب
        از ما حمایت کنید
    </p>
    <p class="text-gray-500 text-right" dir="rtl">
        از طریق آدرس ایمیل
        <a role="text">aa.yosefiyan7@gmail.com</a>
        با ما صحبت کنید
    </p>
</div>
