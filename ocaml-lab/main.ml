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

(*hilo 73;;*)

(* classes *)
class point =
  object
    val mutable x = 21
    method get_x = x
    method move d = x <- x + d
  end;;

let p = new point;;
p#move 21;;

print_int (p#get_x);; print_newline();;

(* class as function *)
class pointfunc x_init =
  object
    val mutable x = x_init
    method get_x = x
    method move d = x <- x + d
  end;;

let p2 = new pointfunc 33;;
print_int (p2#get_x);; print_newline();;

let pobj =
  object
    val mutable x = 12
    method get_x = x
    method move d = x <- x + d
  end;;

print_int (pobj#get_x);; print_newline();;

(* exceptions *)
exception Empty_list;;

let head l =
  match l with
    [] -> raise Empty_list
  | hd :: tl -> hd;;

head [1;2];;

head [];;
