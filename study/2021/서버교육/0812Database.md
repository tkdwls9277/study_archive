

--------------------------------------------------------------------
--생성
--------------------------------------------------------------------

CREATE TABLE SAMPLE_LSJ(
	COM_CODE VARCHAR(6),
	CODE VARCHAR(5),
	CODE_NAME VARCHAR(20),
	BUSINESS_NO VARCHAR(30), 
	QTY NUMERIC(28,10),
	USE_YN CHAR(1),
	WRITE_ID VARCHAR(30),
	WRITE_DT DATETIME,
	MODIFY_ID VARCHAR(30),
	MODIFY_DT DATETIME,	

	CONSTRAINT PK_SJ PRIMARY KEY (COM_CODE, CODE),
	constraint fk_sj foreign key (com_code, business_no) references cust (com_code, business_no)
)

--------------------------------------------------------------------
--추가
--------------------------------------------------------------------

DECLARE @I INT
SET @I = 10
WHILE @I < 40
BEGIN
 INSERT INTO SAMPLE_LSJ VALUES (
     '80000',
     @I,
     SUBSTRING(CAST(RAND() AS VARCHAR(20)), 3,3),
	 @I,
	 @I,
	 'Y',
     SUBSTRING(CAST(RAND() AS VARCHAR(50)), 3,3),
     GETDATE(),
	 SUBSTRING(CAST(RAND() AS VARCHAR(50)), 3,3),
	 GETDATE()
 )

 SET @I = @I + 1
END

--------------------------------------------------------------------
--PROC 추가
--------------------------------------------------------------------

CREATE PROC [dbo].[ESP_SAMPLE_LSJ_LIST]
(  
	@PARAM			VARCHAR(30) = ''		-- 검색조건
,	@SORT_COLUMN	VARCHAR(10)	= 'CODE'	-- 정렬할컬럼명
,	@SORT_TYPE		VARCHAR(5)	= 'ASC'		-- 정렬타입
,	@PAGE_CURRENT	SMALLINT	= 1			-- 페이징 주소	
,	@PAGE_SIZE		SMALLINT	= 15		-- 페이지 크기
)
AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

--동적 sql문을 위한 변수
DECLARE	@V_SQLSTRING	NVARCHAR(1000)
	,	@V_PARAM		NVARCHAR(1000)
	,	@V_WHERE		NVARCHAR(1000);

--paging처리를 위한 변수
DECLARE @STARTINDEX smallint
	,	@ENDINDEX smallint;

SET @V_SQLSTRING = N'
	SELECT code, code_name, cust_name, qty, use_yn
	FROM    (   
		SELECT  a.code, a.code_name, b.cust_name, a.qty, a.use_yn, ROW_NUMBER() over(order by '+@SORT_COLUMN+' '+@SORT_TYPE+', USE_YN DESC) as rownum
		FROM dbo.SAMPLE_LSJ a join cust b 
		on a.business_no = b.business_no and a.com_code = b.com_code
	) RESULT '

--현재 페이지 위치
set @STARTINDEX =  ((@PAGE_CURRENT - 1) * @PAGE_SIZE) + 1;
set @ENDINDEX = @PAGE_CURRENT * @PAGE_SIZE;

--PAGING
SET @V_WHERE = N'WHERE ROWNUM BETWEEN ' + CONVERT(VARCHAR(30), @STARTINDEX) + N' AND ' + CONVERT(VARCHAR(30), @ENDINDEX);

--검색
IF @PARAM IS NOT NULL
BEGIN
	SET @V_WHERE = @V_WHERE + N' AND  CODE LIKE ''%'+@PARAM+'%'' OR CODE_NAME LIKE ''%'+@PARAM+'%'' 
	OR CUST_NAME LIKE ''%'+@PARAM+'%'' OR USE_YN LIKE ''%'+@PARAM+'%'' '
END

--WHERE와 합치기
SET @V_SQLSTRING = @V_SQLSTRING + @V_WHERE;

SELECT @V_SQLSTRING

SET @V_PARAM = N' @PARAM VARCHAR(30),@SORT_COLUMN VARCHAR(10), @SORT_TYPE VARCHAR(5), @PAGE_CURRENT SMALLINT, @PAGE_SIZE SMALLINT'
EXECUTE SP_EXECUTESQL @V_SQLSTRING, @V_PARAM, @PARAM, @SORT_COLUMN, @SORT_TYPE, @PAGE_CURRENT, @PAGE_SIZE

SET NOCOUNT OFF


--------------------------------------------------------------------
--PROC 조작
--------------------------------------------------------------------

DROP PROC [dbo].[ESP_SAMPLE_LSJ_LIST]

SELECT * FROM SAMPLE_LSJ

EXEC [dbo].[ESP_SAMPLE_LSJ_LIST]

--------------------------------------------------------------------
--PROC 실행시 실제로 나오는 쿼리
--------------------------------------------------------------------

SELECT *
FROM    (   
	SELECT  a.code, a.code_name, b.cust_name, a.qty, a.use_yn, ROW_NUMBER() over(order by a.CODE asc) as rownum
	FROM dbo.SAMPLE_LSJ a join cust b WITH(NOLOCK)
	on a.business_no = b.business_no and a.com_code = b.com_code
	) RESULT 
WHERE ROWNUM BETWEEN 1 AND 15 AND 
	CODE LIKE '%31%' OR CODE_NAME LIKE '%25%' OR USE_YN LIKE '%25%'  OR cust_name LIKE '%스%'  
	ORDER BY CODE

--------------------------------------------------------------------
--MEMO
--------------------------------------------------------------------

SQL PROFILER
SQL -> 도구 -> SQL SERVER PROFILER
이벤트선택 -> RPC:COMPLETED(SP를 보여주는 필터)

트랜잭션 

surface - 묻고싶으면 
requere - 안물으려면

--------------------------------------------------------------------
--MEMO
--------------------------------------------------------------------

DECLARE @BUSINESS_NO VARCHAR(10)

SET @BUSINESS_NO=(
	SELECT A.BUSINESS_NO
	FROM SAMPLE_LSJ A JOIN CUST B
	ON B.com_code = A.COM_CODE AND A.BUSINESS_NO = B.BUSINESS_NO
	WHERE A.CODE='151'
)
	
INSERT INTO SAMPLE_LSJ VALUES (
	'313769',
	'158',
	SUBSTRING(CAST(RAND() AS VARCHAR(20)), 3,3),
	@BUSINESS_NO,
	153,
	'Y',
	SUBSTRING(CAST(RAND() AS VARCHAR(50)), 3,3),
	GETDATE(),
	SUBSTRING(CAST(RAND() AS VARCHAR(50)), 3,3),
	GETDATE()
 )