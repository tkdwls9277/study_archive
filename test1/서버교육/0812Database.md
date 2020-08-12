

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
	@COM_CODE		VARCHAR(6)	= '80000'	-- 회사코드
,	@SORTNAME		VARCHAR(10)	= 'CODE'	-- 정렬할컬럼명
,	@SEARCH         VARCHAR(30) = '25'    -- 검색조건
,	@CURRENT		SMALLINT	= 1		-- 페이징 주소	
)
AS

SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

--동적 sql문을 위한 변수
DECLARE	@V_SQLSTRING	NVARCHAR(1000)
	,	@V_PARAM		NVARCHAR(100)
	,	@V_WHERE		NVARCHAR(1000);

--paging처리를 위한 변수
DECLARE @STARTINDEX smallint
	,	@ENDINDEX smallint;

SET @V_SQLSTRING = N'
	SELECT * 
	FROM(
	SELECT  ROW_NUMBER() over(order by CODE asc) as ROWNUM, *
	FROM dbo.SAMPLE_LSJ WITH(NOLOCK, READUNCOMMITTED)
	) RESULT'

SET @V_WHERE = N' WHERE COM_CODE = @COM_CODE '

--현재 페이지 위치
set @STARTINDEX =  ((@CURRENT - 1) * 15) + 1;
set @ENDINDEX = @CURRENT * 15;


--PAGING
SET @V_WHERE = @V_WHERE + N' AND ROWNUM BETWEEN ' + CONVERT(VARCHAR(30), @STARTINDEX) + ' AND ' + CONVERT(VARCHAR(30), @ENDINDEX);

--검색
IF @SEARCH IS NOT NULL
BEGIN
	SET @V_WHERE = @V_WHERE + N' AND COM_CODE LIKE ''%'+@SEARCH+'%'' OR CODE LIKE ''%'+@SEARCH+'%'' OR CODE_NAME LIKE ''%'+@SEARCH+'%'' 
	OR BUSINESS_NO LIKE ''%'+@SEARCH+'%'' OR USE_YN LIKE ''%'+@SEARCH+'%'' '
END

--WHERE와 합치기
SET @V_SQLSTRING = @V_SQLSTRING + @V_WHERE;

--정렬
IF @SORTNAME is not null
BEGIN
	SET @V_SQLSTRING = @V_SQLSTRING + N' ORDER BY ' + @SORTNAME ;
END

SELECT @V_SQLSTRING;

SET @V_PARAM = N' @COM_CODE VARCHAR(6), @SORTNAME VARCHAR(5), @SEARCH VARCHAR(30), @CURRENT SMALLINT'
EXECUTE SP_EXECUTESQL @V_SQLSTRING, @V_PARAM, @COM_CODE, @SORTNAME, @SEARCH, @CURRENT

SET NOCOUNT OFF

--------------------------------------------------------------------
--PROC 제거
--------------------------------------------------------------------

DROP PROC [dbo].[ESP_SAMPLE_LSJ_LIST]

SELECT * FROM SAMPLE_LSJ

EXEC [dbo].[ESP_SAMPLE_LSJ_LIST]