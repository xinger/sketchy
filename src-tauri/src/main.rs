#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn custom_menu(name: &str) -> CustomMenuItem {
  let c = CustomMenuItem::new(name.to_string(), name);
  return c;
}

fn main() {
  let menu = Menu::new()
    .add_submenu(Submenu::new(
      "Sketchy",
      Menu::new()
        .add_native_item(MenuItem::About("Sketchy".to_string()))
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Quit),
    ))
    .add_submenu(Submenu::new(
      "File",
      Menu::new()
        .add_item(custom_menu("New").accelerator("cmdOrControl+N"))
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("Close").accelerator("cmdOrControl+W"))
        .add_item(custom_menu("Save").accelerator("cmdOrControl+S"))
        .add_item(custom_menu("Save As...").accelerator("shift+cmdOrControl+S"))
        .add_native_item(MenuItem::Separator)
        .add_item(custom_menu("Clean").accelerator("cmdOrControl+R"))
    ))
    .add_submenu(Submenu::new(
      "Edit",
      Menu::new()
        .add_native_item(MenuItem::Undo)
        .add_native_item(MenuItem::Redo)
    ));

  tauri::Builder::default()
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
