# Processus d'installation de la base de données

## 1. Installer les dépendances  
    ```bash
    npm install
    ```

## 2. Configurer le fichier `.env`  
    1. Copier le contenu de `.env.example` dans un nouveau fichier `.env`  
    2. Remplacer les valeurs par celles qui correspondent à ta configuration personnelle  

## 3. Vérifier si MySQL est installé  
    Dans le terminal, tape :  
    ```bash
    mysql --version
    ```  
    - Si MySQL n'est pas installé, installe-le (désolé, je ne me souviens plus de la procédure exacte, il était déjà installé 😅)

## 4. Installer l'extension VSCode MySQL  
    Pour faciliter la gestion de ta base, installe cette extension :  

    ![Extension VSCode MySQL](https://image.noelshack.com/fichiers/2025/31/6/1754133369-extension.png)

## 5. Configurer la base de données  
    Assure-toi que ta base de données corresponde aux paramètres de ton `.env`.  

    ![Configuration DB via l'interface graphique de l'extension MySQL](https://image.noelshack.com/fichiers/2025/31/6/1754133984-config-db.png)

## 6. Lancer le serveur et la base de données  
    Dans le terminal, lance :  
    ```bash
    npm start
    ```
