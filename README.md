### Modifie la DB + Le client + créer une migration (si le fichier schema.prisma a été modifié)
** "npx prisma migrate dev" **

*----------------------------------------*

### Quand on supprime ou modifie un modèle déjà existant dans schema.prisma, on délete toute les migrations, puis on fait un :
** "npx prisma migrate reset" **
Et ensuite, on fait un : 
** "npx prisma migrate dev" **
