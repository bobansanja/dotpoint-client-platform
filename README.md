# DotPoint Client Platform

`dotpoint-client-platform` is a Vue 3 client application, using Vuetify 3.

It consists of following modules:

1. Home
   1. Welcome screen, used for user Log-in and Registration.
2. Platform View
   1. Upon Log-in, user is redirected to Platform View, where he can browse Products and Modules which are available to him.
3. Admin Panel
   1. User with `ADMIN` role can access this panel.

### Admin Panel

Admin Panel is the one with most features. It consists of:

1. Configuration _(work in progress)_
   1. Admin can configure his Platform Appearance, by adding logo image and setting a brand color.
2. Content
   1. Products
      1. Admin can view a list of Products.
      2. Admin can create and edit Product.
      3. Admin can enable/disable Product globally.
      4. Admin can make a Product Free and available to all registered users or make it `Subscription Required` globally. The latter would make the product available only to users who have a subscription to it.
   2. Modules
      1. Admin can view a list of Modules.
      2. Admin can create and edit Module and attach it to a certain Product.
      3. Admin can enable/disable Module globally.
      4. Admin can attach multiple Resources to a Module.
      5. Admin can remove Resource attachment to a Module.
   3. Resources
      1. Admin can view a list of Resources.
      2. Admin can create a Resource by uploading a file of types: PDF, Image, Video.
      3. Admin can edit Resource Display name.
      4. Admin can delete a Resource, which will delete the actual file from server.
3. Users
   1. Admin can view a list of registered Users.
   2. Admin can add and remove Product subscriptions for a User.
   3. Admin can set Expiration date of a Product subscription for a User.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
