public class Triangle {

    public static void printCustomTriangle(int n, int m) {
        for (int i = 1; i < m; i++) {
            System.out.println("*".repeat(i + 1));
        }
    }

    public static void main(String[] args) {
        // Initial question of 3x4
        for (int i = 1; i < 4; i++) {
            System.out.println("*".repeat(i+1));
        }
        
        printCustomTriangle(3,4);
    } 
}