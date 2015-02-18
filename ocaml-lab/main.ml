(* Hello World! *)

let hello_world = fun ~name:n ->
  print_string ("Hello, " ^ n ^ "!!");;

(* Average *)
let average a b =
  (a +. b) /. 2.0;;

let avg = average 178.9876 15.2;;
(* print_float (avg);; *)

(* algebra *)
let num = ( * ) ((+) 3 4) ((/) 35 (( * ) 2 5));;
print_int (num); print_newline();;

(* recursion *)
let rec f n = if n == 1 then 1 else n * f (n-1);;
(*print_int (f 6);;*)

(* for loop *)
for i=1 to 10 do  print_int (( * ) i 3); print_string ".. " done; print_newline() ;;

(* user input *)
let rec hilo n =
   print_string "type a number: ";
   let i = read_int () in
   if i = n then print_string "bingo!\n\n"
    else
      begin
        if i < n then print_string "go higher\n" else print_string "go lower\n"  ;
        hilo n
      end ;;

hilo 73;;
