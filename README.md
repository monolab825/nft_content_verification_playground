# سیستم اعتبارسنجی و احراز هویت محتوا بر اساس توکن غیرقابل معاوضه(NFT)
این یک زمین بازی برای آزمایش [چارچوب اعتبارسنجی اصالت محتوا](https://github.com/mohroba/nft_content_verification) است.

## ویژگی‌ها
هر قرارداد یک پرونده html و js اختصاصی دارد که یک رابط ساده را برای ارتباط با قراردادها ایجاد می‌کند.
- قرارداد توکن هویت -> [https://mohroba.github.io/nft_content_verification_playground/itoken.html](https://mohroba.github.io/nft_content_verification_playground/itoken.html)
- قرارداد محتوا -> [https://mohroba.github.io/nft_content_verification_playground/ctoken.html](https://mohroba.github.io/nft_content_verification_playground/ctoken.html)
- قرارداد توکن تایید -> [https://mohroba.github.io/nft_content_verification_playground/vtoken.html](https://mohroba.github.io/nft_content_verification_playground/vtoken.html)

### پیش‌نیازها
برای تست اینها در زنجیره سفارشی خود یا یک تست‌نت، شما باید قراردادها (IToken، CToken، VToken) را پیاده‌سازی کنید و آدرس و ABI (اگر لازم باشد) را جایگزین کنید. به این منظور، شما ممکن است نیاز به نرم‌افزارهای زیر داشته باشید:
- Node.js
- NPM (مدیر بسته Node)
- Hardhat

همچنین به یاد داشته باشید که این زمین بازی با هر کیف پولی که از Web3 پشتیبانی می‌کند (اولویت Metamask) کار می‌کند.

## قدردانی
ما می‌خواهیم از افراد، سازمان‌ها و پروژه‌های زیر صمیمانه سپاسگزاری کنیم که به توسعه این پروژه کمک کرده‌اند:

- **دانشگاه بین‌المللی امام خمینی (ره):** گروه مهندسی کامپیوتر.
- **دکتر حمیدرضا حمیدی:** استاد دانشگاه [@IKIU](https://ikiu.ac.ir/) و راهنمای پروژه.

سپاس ویژه از پروژه‌های متن‌باز زیر:

- [OpenZeppelin](https://openzeppelin.com/): برای ارائه کتابخانه‌ها و ابزارهای قابلیت قراردادهای هوشمند ارزشمند.
- [Hardhat](https://hardhat.org/): یک محیط توسعه قدرتمند برای قراردادهای هوشمند اتریوم.
- [Web3.js](https://web3js.org/): بهترین کتابخانه توسعه برای جاوااسکریپت.
- [Bootstrap](https://getbootstrap.com/): یکی از بهترین کتابخانه‌های انتهای جلو.

همچنین از جامعه گسترده بلاکچین و متن‌باز برای حمایت و الهام مداوم آنها سپاسگزاریم.


# NFT Based Content Authenticity & Verification System
This is a playground for testing the  [content authenticity verification framework](https://github.com/mohroba/nft_content_verification)

## Features
Each contract has a dedicated html and js file that forms a simple interface to interact with contracts.
- IToken Contract -> https://mohroba.github.io/nft_content_verification_playground/itoken.html
- CToken Contract -> https://mohroba.github.io/nft_content_verification_playground/ctoken.html
- VToken Contract -> https://mohroba.github.io/nft_content_verification_playground/vtoken.html

### Prerequisites
To test these on your own custom chain or a test-net , you need to deploy the Contracts (IToken,CToken,VToken) and replace the address and ABI (if neceesary). For that matter, you might need following softwares :
- Node.js
- NPM (Node Package Manager)
- Hardhat

Also remember that playground works with any Web3 supported wallet (Metamask preferred).

## Acknowledgments

I would like to express our sincere appreciation to the following individuals, organizations, and projects that have contributed to the development this project:

- **IKIU:** Imam Khomeini International University (Computer Engineering Department).
- **Dr.HamidReza Hamidi:** Professor [@IKIU](https://ikiu.ac.ir/) & Supervisor of the project.


Special thanks to the following open-source projects:

- [OpenZeppelin](https://openzeppelin.com/): For providing valuable smart contract libraries and tools.
- [Hardhat](https://hardhat.org/): A powerful development environment for Ethereum smart contracts.
- [Web3.js](https://web3js.org/): Best development library for JavaScript.
- [Bootstrap](https://getbootstrap.com/): One the Best front-end libraries.

We are also grateful to the broader blockchain and open-source community for their continuous support and inspiration.
