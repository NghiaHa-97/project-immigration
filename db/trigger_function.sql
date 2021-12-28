Alter trigger genCodeEmployee
    on dbo.Employee
    instead of insert
    as
    begin
        DECLARE @tbCode TABLE
                        (
                            rowNum int IDENTITY (1, 1),
                            idRef  UNIQUEIDENTIFIER
                        );
        Declare @year varchar(4) = format(YEAR(GETDATE()), '0000')
        Declare @month varchar(2) = format(MONTH(GETDATE()), '00')
        DECLARE @firstDayOfMonth DATETIME = DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)
        DECLARE @firstDayOfNextMonth DATETIME = DATEADD(month, DATEDIFF(month, -1, GETDATE()), 0)
        Declare @count int = (select count(1)
                              from Employee e
                              where e.CreateDate >= @firstDayOfMonth
                                and e.CreateDate < @firstDayOfNextMonth)

        insert into @tbCode (idRef)
        select ins.id
        from inserted ins
        order by ins.CreateDate


        insert into dbo.Employee
        select ins.*
        FROM  inserted ins

        update dbo.Employee
        set Code = [dbo].getCode('NV', concat(@year,@month), @count + tb.rowNum)
        FROM @tbCode tb
                 INNER JOIN dbo.Employee as e  ON e.id = tb.idRef
    end;

go

Create trigger genCodeProfile
    on dbo.Profile
    instead of insert
    as
    begin
        DECLARE @tbCode TABLE
                        (
                            rowNum int IDENTITY (1, 1),
                            idRef  UNIQUEIDENTIFIER
                        );
        Declare @year varchar(4) = format(YEAR(GETDATE()), '0000')
        Declare @month varchar(2) = format(MONTH(GETDATE()), '00')
        DECLARE @firstDayOfMonth DATETIME = DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)
        DECLARE @firstDayOfNextMonth DATETIME = DATEADD(month, DATEDIFF(month, -1, GETDATE()), 0)
        Declare @count int = (select count(1)
                              from Profile p
                              where p.CreateDate >= @firstDayOfMonth
                                and p.CreateDate < @firstDayOfNextMonth)

        insert into @tbCode (idRef)
        select ins.id
        from inserted ins
        order by ins.CreateDate


        insert into dbo.Profile
        select ins.*
        FROM  inserted ins

        update dbo.Profile
        set Code = [dbo].getCode('HS', concat(@year,@month), @count + tb.rowNum)
        FROM @tbCode tb
                 INNER JOIN dbo.Profile as p  ON p.id = tb.idRef
    end;

go

Create trigger genCodeExperts
    on dbo.Experts
    instead of insert
    as
    begin
        DECLARE @tbCode TABLE
                        (
                            rowNum int IDENTITY (1, 1),
                            idRef  UNIQUEIDENTIFIER
                        );
        Declare @year varchar(4) = format(YEAR(GETDATE()), '0000')
        Declare @month varchar(2) = format(MONTH(GETDATE()), '00')
        DECLARE @firstDayOfMonth DATETIME = DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0)
        DECLARE @firstDayOfNextMonth DATETIME = DATEADD(month, DATEDIFF(month, -1, GETDATE()), 0)
        Declare @count int = (select count(1)
                              from Experts e
                              where e.CreateDate >= @firstDayOfMonth
                                and e.CreateDate < @firstDayOfNextMonth)

        insert into @tbCode (idRef)
        select ins.id
        from inserted ins
        order by ins.CreateDate


        insert into dbo.Experts
        select ins.*
        FROM  inserted ins

        update dbo.Experts
        set Code = [dbo].getCode('CG', concat(@year,@month), @count + tb.rowNum)
        FROM @tbCode tb
                 INNER JOIN dbo.Experts as e  ON e.id = tb.idRef
    end;

go


alter function getCode(@key nvarchar(2), @dateYearMonth nvarchar(6), @order int)
        returns nvarchar(20)
        as
        begin
            Declare @orderToStr varchar(10) = format(@order, '00000')
            return CONCAT(@key, @dateYearMonth, @orderToStr)
        end;