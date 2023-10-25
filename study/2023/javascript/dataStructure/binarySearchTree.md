# 이진탐색트리 (Binary Search Tree)

-   이진탐색 : 탐색에 소요되는 시간복잡도는 O(logN), but 삽입,삭제가 불가능

-   연결리스트 : 삽입, 삭제의 시간복잡도는 O(1), but 탐색하는 시간복잡도가 O(N)

이 두가지를 합하여 장점을 모두 얻는 것이 '이진탐색트리'
즉, 효율적인 탐색 능력을 가지고, 자료의 삽입 삭제도 가능하게 만들자

<br />

## 특징

-   각 노드의 자식이 2개 이하
-   각 노드의 왼쪽 자식은 부모보다 작고, 오른쪽 자식은 부모보다 큼
-   중복된 노드가 없어야 함

검색 목적 자료구조인데, 굳이 중복이 많은 경우에 트리를 사용하여 검색 속도를 느리게 할 필요가 없음. (트리에 삽입하는 것보다, 노드에 count 값을 가지게 하여 처리하는 것이 훨씬 효율적)

이진탐색트리의 순회는 '중위순회(inorder)' 방식 (왼쪽 - 루트 - 오른쪽)
중위 순회로 정렬된 순서를 읽을 수 있음

<br />

## BST 핵심연산

-   검색
-   삽입
-   삭제
-   트리 생성
-   트리 삭제

<br />

## 시간 복잡도

-   균등 트리 : 노드 개수가 N개일 때 O(logN)
-   편향 트리 : 노드 개수가 N개일 때 O(N)
    > 삽입, 검색, 삭제 시간복잡도는 트리의 Depth에 비례

<br />

## 삭제의 3가지 Case

-   자식이 없는 leaf 노드일 때 → 그냥 삭제
-   자식이 1개인 노드일 때 → 지워진 노드에 자식을 올리기
-   자식이 2개인 노드일 때 → 오른쪽 자식 노드에서 가장 작은 값 or 왼쪽 자식 노드에서 가장 큰 값 올리기

편향된 트리(정렬된 상태 값을 트리로 만들면 한쪽으로만 뻗음)는 시간복잡도가 O(N)이므로 트리를 사용할 이유가 사라짐 → 이를 바로 잡도록 도와주는 개선된 트리가 AVL Tree, RedBlack Tree

<br />

## 코드

```java
public class binarySearchTree {

	public class Node {
		private int data;
		private Node left;
		private Node right;

		public Node(int data) {
			this.setData(data);
			setLeft(null);
			setRight(null);
		}

		public int getData() {
			return data;
		}

		public void setData(int data) {
			this.data = data;
		}

		public Node getLeft() {
			return left;
		}

		public void setLeft(Node left) {
			this.left = left;
		}

		public Node getRight() {
			return right;
		}

		public void setRight(Node right) {
			this.right = right;
		}
	}

	public Node root;
	public binarySearchTree() {
		this.root = null;
	}

	//탐색 연산
	public boolean find(int id){
		Node current = root;
		while(current!=null){
			//현재 노드와 찾는 값이 같으면
			if(current.getData()==id){
				return true;
				//찾는 값이 현재 노드보다 작으면
			} else if(current.getData()>id){
				current = current.getLeft();
				//찾는 값이 현재 노드보다 크면
			} else{
				current = current.getRight();
			}
		}
		return false;
	}
	//삭제 연산
	public boolean delete(int id){
		Node parent = root;
		Node current = root;
		boolean isLeftChild = false;
		while(current.getData()!=id){
			parent = current;
			if(current.getData()>id){
				isLeftChild = true;
				current = current.getLeft();
			}else{
				isLeftChild = false;
				current = current.getRight();
			}
			if(current==null){
				return false;
			}
		}
		//Case 1: 자식노드가 없는 경우
		if(current.getLeft()==null && current.getRight()==null){
			if(current==root){
				root = null;
			}
			if(isLeftChild==true){
				parent.setLeft(null);
			}else{
				parent.setRight(null);
			}
		}
		//Case 2 : 하나의 자식을 갖는 경우
		else if(current.getRight()==null){
			if(current==root){
				root = current.getLeft();
			}else if(isLeftChild){
				parent.setLeft(current.getLeft());
			}else{
				parent.setRight(current.getLeft());
			}
		} else if(current.getLeft()==null){
			if(current==root){
				root = current.getRight();
			}else if(isLeftChild){
				parent.setLeft(current.getRight());
			}else{
				parent.setRight(current.getRight());
			}
		}
		//Case 3 : 두개의 자식을 갖는 경우
		else if(current.getLeft()!=null && current.getRight()!=null){
			// 오른쪽 서브트리의 최소값을 찾음
			Node successor = getSuccessor(current);
			if(current==root){
				root = successor;
			}else if(isLeftChild){
				parent.setLeft(successor);
			}else{
				parent.setRight(successor);
			}
			successor.setLeft(current.getLeft());
		}
		return true;
	}

	public Node getSuccessor(Node deleleNode){
		Node successsor =null;
		Node successsorParent =null;
		Node current = deleleNode.getRight();
		while(current!=null){
			successsorParent = successsor;
			successsor = current;
			current = current.getLeft();
		}
		if(successsor!=deleleNode.getRight()){
			successsorParent.setLeft(successsor.getRight());
			successsor.setRight(deleleNode.getRight());
		}
		return successsor;
	}

	//삽입 연산
	public void insert(int id){
		Node newNode = new Node(id);
		if(root==null){
			root = newNode;
			return;
		}
		Node current = root;
		Node parent = null;
		while(true){
			parent = current;
			if(id < current.getData()){
				current = current.getLeft();
				if(current==null){
					parent.setLeft(newNode);
					return;
				}
			}else{
				current = current.getRight();
				if(current==null){
					parent.setRight(newNode);
					return;
				}
			}
		}
	}

	public void display(Node root){
		if(root!=null){
			display(root.getLeft());
			System.out.print(" " + root.getData());
			display(root.getRight());
		}
	}

	public static void main(String[] args) {

		binarySearchTree b = new binarySearchTree();
		//트리에 노드를 삽입
		b.insert(3);b.insert(8);
		b.insert(1);b.insert(4);b.insert(6);b.insert(2);b.insert(10);b.insert(9);
		b.insert(20);b.insert(25);b.insert(15);b.insert(16);

		System.out.println("트리삽입 결과 : ");
		b.display(b.root);
		System.out.println("");
		System.out.println("이진트리에서 4를 탐색 : " + b.find(4));
		System.out.println("이진트리에서 2를 삭제 : " + b.delete(2));
		b.display(b.root);
		System.out.println("\n이진트리에서 4를 삭제 : " + b.delete(4));
		b.display(b.root);
		System.out.println("\n이진트리에서 10을 삭제 : " + b.delete(10));
		b.display(b.root);
	}

}
```
