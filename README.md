# CertifyLite - Decentralized File Verification and Versioning

CertifyLite to zdecentralizowana aplikacja (DApp) stworzona z wykorzystaniem **React** i **Solidity**, umożliwiająca użytkownikom bezpieczne przechowywanie hashy plików na blockchainie. Aplikacja pozwala na kontrolę wersji plików, weryfikację ich autentyczności oraz zapewnia pełną przejrzystość danych. Do logowania i interakcji z blockchainem wykorzystuje portfel **MetaMask**.

https://certifylite.netlify.app

---

## Funkcjonalności

1. **Przechowywanie hashy plików**  
   Użytkownicy mogą przesyłać hashe swoich plików na blockchain, zapewniając ich niezmienność i możliwość śledzenia.

2. **Wersjonowanie plików**  
   Obsługa wielu wersji tego samego pliku dzięki powiązaniu nowych hashy z poprzednimi.

3. **Weryfikacja autentyczności**  
   Możliwość sprawdzenia autentyczności pliku przez porównanie jego hasha z zapisanym na blockchainie.

4. **Integracja z MetaMask**  
   Logowanie i interakcja z aplikacją odbywa się za pomocą portfela MetaMask.

5. **Sieć blockchain**  
   Wszystkie operacje są realizowane na testowej sieci **Sepolia**, zapewniając zdecentralizowane i przejrzyste przechowywanie danych.

---

## Smart Contract

Kontrakt w Solidity został zaprojektowany do obsługi:

1. **Przechowywania hashy plików wraz ze znacznikiem czasu**
   
2. **Kontroli wersji poprzez powiązanie nowych hashy z poprzednimi**
   
3. **Sprawdzania autentyczności poprzez porównanie hashy**
   
4. **Kod kontraktu znajduje się w folderze /contracts.**

---

## Technologie

- **Frontend:** React, Tailwind CSS
- **Blockchain:** Solidity, Truffle
- **Integracja portfela:** MetaMask
- **Sieć:** Sepolia Testnet
- **Hashowanie:** Crypto.js

---






