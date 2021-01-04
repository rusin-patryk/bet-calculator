# Bet Calculator

**O co chodzi?**

Bet calculator jest prostą aplikacją stworzoną na potrzebę udowodnienia postawionej tezy wśród grupy znajomych.
Mówiąc dokładniej - pojawił się pomysł wygrywania w popularną grę hazardową Ruletka.
Pomysł polega na tym, aby cały czas obstawiać ten sam kolor za odpowiednią kwotę, np. $1. W przypadku wygrania, obstawiamy dalej.
W przypadku przegrania, podwajamy zakład i kolejny raz obstawiamy ten sam kolor. Czyli po jednej przegranej zakład będzie wynosił $2, później $4, $8, $16 itd.
Założenie jest takie, że pojawienie się np. 10 razy tego samego koloru jest bardzo mało prawdopodobne, a z każdym kolejnym razem to prawdopodobieństwo maleje.
Teza, którą aplikacja ma udowadniać jest taka, że w przypadku odpowiednio dużej liczby prób, stracenie całego wkładu jest pewne.
Mówiąc krótko, nie da się "zarobić" na grze opierającej się o losowość. Tym bardziej, że w ruletce kolor zielony przegrywa, więc szanse zawsze są mniejsze od 50%.
W aplikacji możliwe jest przetestowanie bardzo różnej konfiguracji i wykonanie dużej liczby losowań.

**Jak to działa?**

Zapraszam do obejrzenia i spróbowania "szczęścia", demo jest dostępne pod linkiem: [bet-calculator.patryk.in](https://bet-calculator.patryk.in).
Wystarczy wprowadzić dane wejściowe. Aplikacja przewiduje kolor zielony, który przegrywa zawsze.
W przypadku ustawienia np. 500 losowań, gdy losowanie nr 500 będzie przegrane, aplikacja będzie kontynuować próby wygrania przez podwajanie zakłądu, aż do wyczerpania kwoty wpłaty.
Czas 1 losowania służy do obliczenia zarobku w przeliczeniu na jednostkę czasu.
Dodatokwe próby oznaczają, że aplikacja podaną ilość razy będzie ponawiać losowanie pomimo wyczerpania się budżetu.

![Screen](https://patryk.in/wp-content/uploads/2021/01/Opera-Zrzut-ekranu_2021-01-04_151547_localhost.png)

## TODO

```
1. Refaktoryzacja i podzielenie kodu na komponenty.
2. Uproszczenie i podzielenie funkcji stosując zasadę pojedynczej odpowiedzialności.
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
