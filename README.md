# Shoe Store

## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

## launch the projects

Run the following to start tapping into the inventory events.

```
(bin/)websocketd --port=8080 ruby back/inventory.rb
```

and head to the `front` folder and start the server with

```
yarn dev
```

open a browser and navigate to your localhost:3000, login and start receiving sales information.
