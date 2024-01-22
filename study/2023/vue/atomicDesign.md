# atomic design

아토믹 디자인(atomic design)은 화학을 기반으로 디자인 시스템을 만드는 방법론으로, 매우 기본적인 것부터 시작하여 더욱 복잡해집니다. 원자 설계에는 5개의 고유한 레벨이 있습니다.

- Atom (chemistry-based naming)(화학 기반 명명)
- Molecule (chemistry-based naming)(화학 기반 명명)
- Organism (chemistry-based naming)(화학 기반 명명)
- Template (web-based naming)(웹 기반 이름 지정)
- mPage (web-based naming)(웹 기반 이름 지정)

Atomic 디자인은 많은 프런트엔드 프레임워크에서 구현될 수 있습니다. 이 기사에서는 Vue 프레임워크 코드가 포함된 모든 구성 요소의 예를 제공합니다.

![](images/atomicDesign1.png)

## 원자

Atom은 애플리케이션을 구성하는 가장 작은 단위입니다. 애플리케이션을 빌드하는 데 단독으로 사용할 수는 없지만 컬렉션을 사용하면 가능합니다. 코드에서 Atom은 애플리케이션 전체에서 재사용될 사용자 정의 스타일과 동적 콘텐츠가 포함된 HTML 태그를 의미합니다.

![예시 title.vue](images/atomicDesign2.png)
> 예시 title.vue

