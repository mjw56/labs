let hello_world = fun ~name:n ->
  print_string ("Hello, " ^ n ^ "!!");;

hello_world ~name:"World"
