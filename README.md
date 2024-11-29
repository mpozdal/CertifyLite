# 🚀 CertifyLite - Decentralized File Verification and Versioning

**CertifyLite** to zdecentralizowana aplikacja (DApp) stworzona z wykorzystaniem **React** i **Solidity**, umożliwiająca użytkownikom bezpieczne przechowywanie hashy plików na blockchainie. Aplikacja pozwala na kontrolę wersji plików, weryfikację ich autentyczności oraz zapewnia pełną przejrzystość danych. Do logowania i interakcji z blockchainem wykorzystuje portfel **MetaMask**.

🌐 **[Zobacz aplikację online](https://certifylite.netlify.app)**

---

## ✨ Funkcjonalności

- 🔐 **Przechowywanie hashy plików**  
  Użytkownicy mogą przesyłać hashe swoich plików na blockchain, zapewniając ich niezmienność i możliwość śledzenia.

- 📄 **Wersjonowanie plików**  
  Obsługa wielu wersji tego samego pliku dzięki powiązaniu nowych hashy z poprzednimi.

- ✅ **Weryfikacja autentyczności**  
  Możliwość sprawdzenia autentyczności pliku przez porównanie jego hasha z zapisanym na blockchainie.

- 🦊 **Integracja z MetaMask**  
  Logowanie i interakcja z aplikacją odbywa się za pomocą portfela MetaMask.

- ⛓️ **Sieć blockchain**  
  Wszystkie operacje są realizowane na testowej sieci **Sepolia**, zapewniając zdecentralizowane i przejrzyste przechowywanie danych.

---

## 📜 Smart Contract

Kontrakt w **Solidity** został zaprojektowany do obsługi:
- 🗂️ Przechowywania hashy plików wraz ze znacznikiem czasu.  
- 🔄 Kontroli wersji poprzez powiązanie nowych hashy z poprzednimi.  
- 🔍 Sprawdzania autentyczności poprzez porównanie hashy.  

Kod kontraktu znajduje się w folderze `/contracts`.

---

## 🛠️ Technologie

- **Frontend**: React, Tailwind CSS  
- **Blockchain**: Solidity, Truffle  
- **Integracja portfela**: MetaMask  
- **Sieć**: Sepolia Testnet  
- **Hashowanie**: Crypto.js  

---
