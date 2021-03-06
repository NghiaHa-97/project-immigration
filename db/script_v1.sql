USE [db_do_an]
GO
/****** Object:  UserDefinedFunction [dbo].[getCode]    Script Date: 2/21/2022 11:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[getCode](@key nvarchar(2), @dateYearMonth nvarchar(6), @order int)
    returns nvarchar(20)
    as
    begin
        Declare @orderToStr varchar(10) = format(@order, '00000')
        return CONCAT(@key,@dateYearMonth,@orderToStr)
    end
GO
/****** Object:  Table [dbo].[AssignTasks]    Script Date: 2/21/2022 11:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssignTasks](
	[ID] [uniqueidentifier] NOT NULL,
	[DepartmentID] [int] NULL,
	[ProfileID] [uniqueidentifier] NULL,
	[Description] [nvarchar](max) NULL,
	[Result] [nvarchar](max) NULL,
	[ExpirationDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[UpdateDate] [datetime] NULL,
	[Title] [nvarchar](512) NULL,
	[EmployeeCreateID] [uniqueidentifier] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CityProvince]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CityProvince](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[ID] [uniqueidentifier] NOT NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[ProfileID] [uniqueidentifier] NULL,
	[Status] [int] NULL,
	[Reason] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommuneWard]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommuneWard](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[DistrictID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](512) NULL,
	[WorkUnitID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[District]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[District](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[CityProvinceID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[ID] [uniqueidentifier] NOT NULL,
	[Code] [nvarchar](20) NULL,
	[FullName] [nvarchar](512) NULL,
	[Avatar] [nvarchar](100) NULL,
	[Gender] [bit] NULL,
	[BirthDay] [date] NULL,
	[CityProvinceID] [int] NULL,
	[DistrictID] [int] NULL,
	[CommuneWardID] [int] NULL,
	[Description] [nvarchar](512) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[NumberIdentityCard] [nvarchar](50) NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
	[DepartmentID] [int] NULL,
	[PositionID] [int] NULL,
	[WorkUnitID] [int] NULL,
	[UnitTypeID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeInProfile]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeInProfile](
	[EmployeeID] [uniqueidentifier] NOT NULL,
	[ProfileID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experts]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experts](
	[ID] [uniqueidentifier] NOT NULL,
	[Code] [nvarchar](20) NULL,
	[FullName] [nvarchar](512) NULL,
	[Gender] [bit] NULL,
	[BirthDay] [date] NULL,
	[CountryID] [int] NULL,
	[Religion] [nvarchar](50) NULL,
	[Occupation] [nvarchar](50) NULL,
	[PermanentResidentialAddress] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[PassportNumber] [nvarchar](100) NULL,
	[ExpiryDate] [date] NULL,
	[DateOfEntry] [date] NULL,
	[LengthOfStay] [int] NULL,
	[PassportImage] [nvarchar](100) NULL,
	[PortraitPhotography] [nvarchar](100) NULL,
	[CreateDate] [datetime] NULL,
	[updatedate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExpertsInProfile]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpertsInProfile](
	[ExpertsID] [uniqueidentifier] NOT NULL,
	[ProfileID] [uniqueidentifier] NOT NULL,
	[Position] [nvarchar](100) NULL,
	[LocationID] [bigint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ObjectTypeID] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[Longitude] [float] NULL,
	[Latitude] [float] NULL,
	[Description] [nvarchar](100) NULL,
	[CityProvinceID] [int] NULL,
	[DistrictID] [int] NULL,
	[CommuneWardID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Module](
	[ID] [int] NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Code] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ObjectType]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ObjectType](
	[Name] [nvarchar](100) NULL,
	[Image] [nvarchar](max) NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[Name] [nvarchar](20) NULL,
	[ModuleID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermissionRole]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionRole](
	[PermissionID] [int] NOT NULL,
	[RoleID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Position]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Position](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[DepartmentID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[ID] [uniqueidentifier] NOT NULL,
	[Code] [nvarchar](20) NULL,
	[ProjectMissionID] [int] NULL,
	[WorkUnitID] [int] NULL,
	[DepartmentID] [int] NULL,
	[VehicleID] [int] NULL,
	[StatusProfileID] [int] NULL,
	[Description] [nvarchar](max) NULL,
	[ExpirationDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
	[EmployeeCreateID] [uniqueidentifier] NULL,
	[ApproverID] [uniqueidentifier] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectMission]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectMission](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](512) NULL,
	[Description] [nvarchar](max) NULL,
	[WorkUnitCreateID] [int] NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusProfile]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusProfile](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](512) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysUser]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NULL,
	[Password] [nvarchar](512) NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[IsActive] [bit] NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
	[RoleID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysUserAdmin]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysUserAdmin](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](512) NOT NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
	[RoleID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UnitType]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnitType](
	[ID] [int] NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkUnit]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkUnit](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](512) NULL,
	[CityProvinceID] [int] NULL,
	[DistrictID] [int] NULL,
	[CommuneWardID] [int] NULL,
	[Description] [nvarchar](512) NULL,
	[UnitTypeID] [int] NULL,
	[LocationID] [bigint] NULL
) ON [PRIMARY]
GO
INSERT [dbo].[AssignTasks] ([ID], [DepartmentID], [ProfileID], [Description], [Result], [ExpirationDate], [CreateDate], [EmployeeID], [UpdateDate], [Title], [EmployeeCreateID]) VALUES (N'80bbd7c5-5d2a-4df1-8ba5-49981b48134e', 1, N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8', N'TTT', NULL, CAST(N'2022-02-12T09:51:42.000' AS DateTime), CAST(N'2022-02-12T09:51:46.000' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[AssignTasks] ([ID], [DepartmentID], [ProfileID], [Description], [Result], [ExpirationDate], [CreateDate], [EmployeeID], [UpdateDate], [Title], [EmployeeCreateID]) VALUES (N'359406c3-a339-4c4b-b3df-a1b0f7a1b113', NULL, N'ddfbdb5c-892b-b940-b3cb-d466048e3c02', N'LLL', NULL, CAST(N'2022-05-16T09:54:10.000' AS DateTime), CAST(N'2023-02-12T09:52:13.000' AS DateTime), N'7c4f1424-9c95-344a-bc45-613a979d1ca2', NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[CityProvince] ON 

INSERT [dbo].[CityProvince] ([ID], [Name]) VALUES (1, N'Hà Nội')
SET IDENTITY_INSERT [dbo].[CityProvince] OFF
GO
SET IDENTITY_INSERT [dbo].[CommuneWard] ON 

INSERT [dbo].[CommuneWard] ([ID], [Name], [DistrictID]) VALUES (1, N'Quang Minh', 2)
INSERT [dbo].[CommuneWard] ([ID], [Name], [DistrictID]) VALUES (2, N'Kim Hoa', 2)
INSERT [dbo].[CommuneWard] ([ID], [Name], [DistrictID]) VALUES (3, N'Cổ Nhuế', 1)
SET IDENTITY_INSERT [dbo].[CommuneWard] OFF
GO
SET IDENTITY_INSERT [dbo].[Country] ON 

INSERT [dbo].[Country] ([ID], [Name]) VALUES (1, N'Nga')
INSERT [dbo].[Country] ([ID], [Name]) VALUES (2, N'Trung Quốc')
INSERT [dbo].[Country] ([ID], [Name]) VALUES (3, N'Nhật Bản')
SET IDENTITY_INSERT [dbo].[Country] OFF
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([ID], [Name], [WorkUnitID]) VALUES (1, N'Phòng ban 1', 1)
INSERT [dbo].[Department] ([ID], [Name], [WorkUnitID]) VALUES (2, N'Phòng ban 2', 1)
INSERT [dbo].[Department] ([ID], [Name], [WorkUnitID]) VALUES (3, N'Phòng ban 3', 2)
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[District] ON 

INSERT [dbo].[District] ([ID], [Name], [CityProvinceID]) VALUES (1, N'Nam Từ Niêm', 1)
INSERT [dbo].[District] ([ID], [Name], [CityProvinceID]) VALUES (2, N'Mê Linh', 1)
SET IDENTITY_INSERT [dbo].[District] OFF
GO
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'c0b67167-df97-7146-9c8e-470da05865d0', NULL, N'Dev Test', N'user-photos/6771b6c0-97df-4671-9c8e-470da05865d0/2022-02-04T21-12-47.734.webp', 0, CAST(N'2022-02-04' AS Date), 1, 2, 2, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T21:12:47.733' AS DateTime), CAST(N'2022-02-04T21:12:47.733' AS DateTime), 1, 2, 1, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'66ffb3d0-2da6-384c-a645-762ce0b17dd9', NULL, N'Dev Test', N'user-photos/d0b3ff66-a62d-4c38-a645-762ce0b17dd9/2022-02-04T21-16-01.626.png', 0, CAST(N'2022-02-04' AS Date), 1, 1, 3, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T21:16:01.627' AS DateTime), CAST(N'2022-02-04T21:16:01.627' AS DateTime), 2, 1, 2, 1)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'7c4f1424-9c95-344a-bc45-613a979d1ca2', N'NV20220200003', N'gggggggg', N'user-photos/24144f7c-959c-4a34-bc45-613a979d1ca2/2022-02-04T21-23-28.560.webp', 0, CAST(N'2022-02-04' AS Date), 1, 1, 3, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T21:23:28.560' AS DateTime), CAST(N'2022-02-04T21:23:28.560' AS DateTime), 3, 1, 2, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'24a7e53f-9c76-8b45-b59c-13bbf525f9c7', N'NV20220100001', N'Hà Duy Nghĩa', NULL, NULL, CAST(N'2022-01-18' AS Date), NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2022-01-04T16:18:47.610' AS DateTime), CAST(N'2022-01-04T16:18:47.610' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'd04900cd-58d8-d345-a689-ec8380abc6fd', N'NV20220100002', N'Hà Duy Nghĩa', N'user-photos/cd0049d0-d858-45d3-a689-ec8380abc6fd/2022-01-04T16-23-17.063.PNG', NULL, CAST(N'2022-01-19' AS Date), NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2022-01-04T16:23:17.063' AS DateTime), CAST(N'2022-01-04T16:23:17.063' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'e2e650db-1a7e-be47-a94b-f7e9ace9d8ca', N'NV20220100003', N'Dev Test 123', N'user-photos/db50e6e2-7e1a-47be-a94b-f7e9ace9d8ca/2022-01-05T14-58-46.661.PNG', 0, CAST(N'2021-09-08' AS Date), 1, 2, 2, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-01-05T14:56:53.000' AS DateTime), CAST(N'2022-01-05T20:16:05.697' AS DateTime), 1, 2, 1, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'30301aa5-6ea5-0f4a-a848-4910d05662e4', N'NV20220100007', N'Dev Test LL', N'user-photos/a51a3030-a56e-4a0f-a848-4910d05662e4/2022-01-05T20-25-23.185.PNG', 0, CAST(N'2022-01-05' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-01-05T20:25:23.187' AS DateTime), CAST(N'2022-01-05T20:25:23.187' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'72ae8ff6-163c-b047-bd0b-ee6561335186', N'NV20220200008', N'Dev Test', N'user-photos/f68fae72-3c16-47b0-bd0b-ee6561335186/2022-02-05T12-07-28.582.webp', 0, CAST(N'2022-02-05' AS Date), 1, 2, 1, N'description', N'01234556678', N'11111111', CAST(N'2022-02-05T12:07:28.583' AS DateTime), CAST(N'2022-02-05T12:07:28.583' AS DateTime), NULL, NULL, NULL, 2)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'c43a28e2-23ec-b647-af51-a8bda07eaf8b', N'NV20220200009', N'Dev Test', N'user-photos/e2283ac4-ec23-47b6-af51-a8bda07eaf8b/2022-02-05T12-17-16.064.png', 1, CAST(N'2022-02-05' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-05T12:17:16.063' AS DateTime), CAST(N'2022-02-05T12:17:16.063' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'b3ea43f1-fe69-0441-b1b0-ba3618f04647', N'NV20220200010', N'Dev Test', N'user-photos/f143eab3-69fe-4104-b1b0-ba3618f04647/2022-02-05T12-21-07.681.PNG', 1, CAST(N'2022-02-05' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-05T12:21:07.680' AS DateTime), CAST(N'2022-02-05T12:21:07.680' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', N'NV20220200011', N'Dev Test bnbvnbv', N'user-photos/12b6e250-7f93-46dc-9d27-5e3ab7674ea8/2022-02-05T12-21-26.742.webp', 1, CAST(N'2022-02-05' AS Date), 1, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-05T12:21:26.743' AS DateTime), CAST(N'2022-02-05T12:21:26.743' AS DateTime), NULL, NULL, 1, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'9cf6778c-9e3d-1047-a547-6b69fb62338d', N'NV20220200014', N'Dev Test', N'user-photos/8c77f69c-3d9e-4710-a547-6b69fb62338d/2022-02-12T20-18-30.089.png', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T20:18:30.090' AS DateTime), CAST(N'2022-02-12T20:18:30.090' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'ed102430-bb21-c74a-acb2-01c760ba62df', N'NV20220200019', N'Dev Test', N'user-photos/302410ed-21bb-4ac7-acb2-01c760ba62df/2022-02-12T21-24-20.234.PNG', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T21:24:20.233' AS DateTime), CAST(N'2022-02-12T21:24:20.233' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'ce8bc4d5-c09e-3e4c-bb75-f7d9357bfeeb', N'NV20220100004', N'Dev Test000', N'user-photos/d5c48bce-9ec0-4c3e-bb75-f7d9357bfeeb/2022-01-05T20-17-29.608.PNG', 1, CAST(N'2021-08-10' AS Date), 1, 2, 2, N'description  123', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-01-05T20:17:29.607' AS DateTime), CAST(N'2022-01-05T20:17:29.607' AS DateTime), 1, 3, 1, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'f528adf9-f9c7-7245-9a23-11fecf3a6328', N'NV20220200004', N'Dev Test', N'user-photos/null/2022-02-04T21-42-55.150.png', 0, CAST(N'2022-02-04' AS Date), 1, 1, 3, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T21:42:55.150' AS DateTime), CAST(N'2022-02-04T21:42:55.150' AS DateTime), 1, 1, 1, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'3f95b424-2013-9d41-9201-b4a21645c49f', N'NV20220200006', N'Dev111111', N'user-photos/null/2022-02-04T22-06-43.585.png', 0, CAST(N'2022-02-04' AS Date), 1, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T22:06:43.587' AS DateTime), CAST(N'2022-02-04T22:06:43.587' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'3053dd4b-6d05-cb47-a883-37566ddee45e', N'NV20220200007', N'Dev Test la', N'user-photos/null/2022-02-04T22-08-53.193.webp', 0, CAST(N'2022-02-04' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T22:08:53.193' AS DateTime), CAST(N'2022-02-04T22:08:53.193' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'78560a49-b721-2c41-a006-27b1834a72d6', N'NV20220200012', N'Dev Test', N'user-photos/490a5678-21b7-412c-a006-27b1834a72d6/2022-02-05T12-22-46.278.webp', 1, CAST(N'2022-02-05' AS Date), 1, 2, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-05T12:22:46.277' AS DateTime), CAST(N'2022-02-05T12:22:46.277' AS DateTime), NULL, NULL, NULL, 2)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'77cd0515-1e62-444d-b1e4-17a5627d290b', N'NV20220200013', N'Dev Test', N'user-photos/1505cd77-621e-4d44-b1e4-17a5627d290b/2022-02-12T20-12-06.236.png', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T20:12:06.237' AS DateTime), CAST(N'2022-02-12T20:12:06.237' AS DateTime), 1, 3, 1, 3)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'f34f710f-f0e2-c643-9992-2920bf7a2031', N'NV20220200015', N'Dev Test', N'user-photos/0f714ff3-e2f0-43c6-9992-2920bf7a2031/2022-02-12T20-20-53.985.png', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T20:20:53.987' AS DateTime), CAST(N'2022-02-12T20:20:53.987' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'c62aa792-67f3-7c49-bf45-220920dec607', N'NV20220200018', N'Dev Test', N'user-photos/92a72ac6-f367-497c-bf45-220920dec607/2022-02-12T20-50-35.730.PNG', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T20:50:35.730' AS DateTime), CAST(N'2022-02-12T20:50:35.730' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'726bb595-ad94-434d-a845-66909a98f8e7', N'NV20220200005', N'Dev Test', N'user-photos/null/2022-02-04T21-47-22.347.webp', 0, CAST(N'2022-02-04' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-04T21:47:22.347' AS DateTime), CAST(N'2022-02-04T21:47:22.347' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'4daf70bb-ac8c-2245-913c-4f1ceba32bf9', N'NV20220200016', N'Dev Test', N'user-photos/bb70af4d-8cac-4522-913c-4f1ceba32bf9/2022-02-12T20-23-45.830.PNG', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T20:23:45.830' AS DateTime), CAST(N'2022-02-12T20:23:45.830' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID], [UnitTypeID]) VALUES (N'5d590498-a729-0248-90b3-f7ab726a05d8', N'NV20220200017', N'Dev Test', N'user-photos/9804595d-29a7-4802-90b3-f7ab726a05d8/2022-02-12T20-25-03.010.PNG', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, N'description', N'phoneNumber', N'numberIdentityCard', CAST(N'2022-02-12T20:25:03.010' AS DateTime), CAST(N'2022-02-12T20:25:03.010' AS DateTime), NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'ed102430-bb21-c74a-acb2-01c760ba62df', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'ed102430-bb21-c74a-acb2-01c760ba62df', N'cfd41c3c-e699-304d-9483-733d3d38ae6f')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'ed102430-bb21-c74a-acb2-01c760ba62df', N'e9b87342-4d36-0644-ba6d-b4966e835183')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'ed102430-bb21-c74a-acb2-01c760ba62df', N'd7c9f75f-25ab-0042-b614-b50fed3d3027')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'24a7e53f-9c76-8b45-b59c-13bbf525f9c7', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'c62aa792-67f3-7c49-bf45-220920dec607', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'c62aa792-67f3-7c49-bf45-220920dec607', N'cfd41c3c-e699-304d-9483-733d3d38ae6f')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'c62aa792-67f3-7c49-bf45-220920dec607', N'e9b87342-4d36-0644-ba6d-b4966e835183')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'c62aa792-67f3-7c49-bf45-220920dec607', N'd7c9f75f-25ab-0042-b614-b50fed3d3027')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'78560a49-b721-2c41-a006-27b1834a72d6', N'ddfbdb5c-892b-b940-b3cb-d466048e3c02')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'4daf70bb-ac8c-2245-913c-4f1ceba32bf9', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', N'ddfbdb5c-892b-b940-b3cb-d466048e3c02')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'72ae8ff6-163c-b047-bd0b-ee6561335186', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'5d590498-a729-0248-90b3-f7ab726a05d8', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'5d590498-a729-0248-90b3-f7ab726a05d8', N'e9b87342-4d36-0644-ba6d-b4966e835183')
GO
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'cb771544-d4e9-4e42-a3d7-e12c59503ade', N'CG20211200001', N'LLLLLL', NULL, CAST(N'2022-02-09' AS Date), 1, NULL, NULL, NULL, NULL, NULL, CAST(N'2022-02-16' AS Date), CAST(N'2022-02-16' AS Date), NULL, N'user-photos/441577cb-e9d4-424e-a3d7-e12c59503ade/passport_image_2022-02-07T08-22-28.556.PNG', N'user-photos/441577cb-e9d4-424e-a3d7-e12c59503ade/portrait_photography_2022-02-07T08-22-28.556.webp', CAST(N'2021-12-28T16:59:16.000' AS DateTime), CAST(N'2022-02-07T08:22:28.557' AS DateTime))
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'b59d31fe-d554-4086-841a-9df6f58d67f4', N'CG20211200002', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-28T16:59:16.587' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'7208c60c-aaac-4acd-a292-ed365bd152ab', N'CG20211200003', NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-30T13:15:39.003' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'a2caac7c-1be8-429b-955d-6f728ce7d753', N'CG20211200004', NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-30T13:15:39.003' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'9ea86bff-4119-124c-ad54-1478aff828a3', N'CG20220200001', N'Dev Test', 1, CAST(N'2022-02-01' AS Date), 3, N'expiryDate', N'expiryDate', N'expiryDate', N'expiryDate', N'expiryDate', CAST(N'2022-02-02' AS Date), CAST(N'2022-02-03' AS Date), 8, N'user-photos/ff6ba89e-1941-4c12-ad54-1478aff828a3/passport_image_2022-02-06T22-55-15.381.webp', N'user-photos/ff6ba89e-1941-4c12-ad54-1478aff828a3/portrait_photography_2022-02-06T22-55-15.381.PNG', CAST(N'2022-02-06T22:55:15.000' AS DateTime), CAST(N'2022-02-07T08:31:01.403' AS DateTime))
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'1d87df35-6ea7-ca49-b837-154c974986dd', N'CG20220200002', N'Dev Test', 0, CAST(N'2022-02-06' AS Date), 2, NULL, NULL, NULL, N'00000000000000', N'fdsfsdf', CAST(N'2022-02-06' AS Date), CAST(N'2022-02-06' AS Date), 10, N'user-photos/35df871d-a76e-49ca-b837-154c974986dd/passport_image_2022-02-06T23-21-11.874.PNG', N'user-photos/35df871d-a76e-49ca-b837-154c974986dd/portrait_photography_2022-02-06T23-21-11.874.PNG', CAST(N'2022-02-06T23:16:51.000' AS DateTime), CAST(N'2022-02-07T08:22:41.297' AS DateTime))
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'22ece166-aebc-ec40-812d-be5ab6064a53', N'CG20220200003', N'Dev Test', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2022-02-12' AS Date), CAST(N'2022-02-12' AS Date), NULL, N'user-photos/66e1ec22-bcae-40ec-812d-be5ab6064a53/passport_image_2022-02-12T21-29-42.470.PNG', N'user-photos/66e1ec22-bcae-40ec-812d-be5ab6064a53/portrait_photography_2022-02-12T21-29-42.470.png', CAST(N'2022-02-12T21:29:42.470' AS DateTime), CAST(N'2022-02-12T21:29:42.470' AS DateTime))
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'6d8846e3-2238-8243-ab52-437b6041bbd5', N'CG20220200004', N'Dev Test', 1, CAST(N'2022-02-12' AS Date), NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2022-02-12' AS Date), CAST(N'2022-02-12' AS Date), NULL, N'user-photos/e346886d-3822-4382-ab52-437b6041bbd5/passport_image_2022-02-12T21-46-35.156.PNG', N'user-photos/e346886d-3822-4382-ab52-437b6041bbd5/portrait_photography_2022-02-12T21-46-35.156.PNG', CAST(N'2022-02-12T21:46:35.157' AS DateTime), CAST(N'2022-02-12T21:46:35.157' AS DateTime))
GO
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'6d8846e3-2238-8243-ab52-437b6041bbd5', N'44fc59cd-8d69-43a7-9036-1ccbad8bc8ed', N'11111111111', 20)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'6d8846e3-2238-8243-ab52-437b6041bbd5', N'9bfcdab3-f196-2641-9bd7-5bb4e7c91cbc', N'2222222', 20)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'b59d31fe-d554-4086-841a-9df6f58d67f4', N'e9b87342-4d36-0644-ba6d-b4966e835183', N'88888888888', 20)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'6d8846e3-2238-8243-ab52-437b6041bbd5', N'39fe3e61-82c4-9a48-8e9e-a27c9fb60fd3', NULL, NULL)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'6d8846e3-2238-8243-ab52-437b6041bbd5', N'e9b87342-4d36-0644-ba6d-b4966e835183', N'33333333333333', 25)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'7208c60c-aaac-4acd-a292-ed365bd152ab', N'e9b87342-4d36-0644-ba6d-b4966e835183', N'1111111111111111111111112222222222222', 20)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'a2caac7c-1be8-429b-955d-6f728ce7d753', N'e9b87342-4d36-0644-ba6d-b4966e835183', N'11111111111111111111111111', 20)
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID], [Position], [LocationID]) VALUES (N'22ece166-aebc-ec40-812d-be5ab6064a53', N'c7363b8b-4f21-ae44-bb00-0989c334d523', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Location] ON 

INSERT [dbo].[Location] ([ID], [ObjectTypeID], [Name], [Longitude], [Latitude], [Description], [CityProvinceID], [DistrictID], [CommuneWardID]) VALUES (20, 22, N'rwereesfd', 105.81327438354492, 21.250822088093649, NULL, 1, 1, 3)
INSERT [dbo].[Location] ([ID], [ObjectTypeID], [Name], [Longitude], [Latitude], [Description], [CityProvinceID], [DistrictID], [CommuneWardID]) VALUES (25, 21, N'1234', 105.77396392822267, 21.022021133252611, N'', 1, 1, 3)
SET IDENTITY_INSERT [dbo].[Location] OFF
GO
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (1, N'Nhân viên', 1)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (2, N'Hồ sơ', 2)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (3, N'Chuyên gia', 3)
GO
SET IDENTITY_INSERT [dbo].[ObjectType] ON 

INSERT [dbo].[ObjectType] ([Name], [Image], [ID]) VALUES (N'Test 1', N'user-photos/object-type/2022-02-18T21-19-18.801.PNG', 3)
INSERT [dbo].[ObjectType] ([Name], [Image], [ID]) VALUES (N'111111111111111111', N'user-photos/object-type/2022-02-18T21-55-11.714.png', 16)
INSERT [dbo].[ObjectType] ([Name], [Image], [ID]) VALUES (N'00000', N'user-photos/object-type/2022-02-18T23-04-03.331.PNG', 7)
INSERT [dbo].[ObjectType] ([Name], [Image], [ID]) VALUES (N'Loại 1', N'user-photos/object-type/2022-02-19T16-00-49.129.png', 21)
INSERT [dbo].[ObjectType] ([Name], [Image], [ID]) VALUES (N'Sân bay', N'user-photos/object-type/2022-02-19T16-05-11.592.png', 22)
SET IDENTITY_INSERT [dbo].[ObjectType] OFF
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 

INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (1, 10, N'Xem', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (2, 11, N'Thêm', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (3, 12, N'Sửa', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (4, 13, N'Xóa', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (5, 20, N'Xem', 2)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (6, 21, N'Thêm', 2)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (7, 22, N'Sửa', 2)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (8, 23, N'Xóa', 2)
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1050)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1050)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1050)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1046)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1048)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1049)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1053)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1054)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1046)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1048)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1049)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1053)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1054)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1046)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1048)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1049)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1053)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1054)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1058)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1045)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1046)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1049)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1053)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1054)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1055)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1056)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1057)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1058)
GO
SET IDENTITY_INSERT [dbo].[Position] ON 

INSERT [dbo].[Position] ([ID], [Name], [DepartmentID]) VALUES (1, N'Trưởng phòng', 1)
INSERT [dbo].[Position] ([ID], [Name], [DepartmentID]) VALUES (2, N'Trợ lý', 1)
INSERT [dbo].[Position] ([ID], [Name], [DepartmentID]) VALUES (3, N'Nhân viên', 1)
SET IDENTITY_INSERT [dbo].[Position] OFF
GO
INSERT [dbo].[Profile] ([ID], [Code], [ProjectMissionID], [WorkUnitID], [DepartmentID], [VehicleID], [StatusProfileID], [Description], [ExpirationDate], [CreateDate], [UpdateDate], [EmployeeCreateID], [ApproverID]) VALUES (N'9bfcdab3-f196-2641-9bd7-5bb4e7c91cbc', N'HS20220200001', NULL, NULL, NULL, NULL, 1, NULL, NULL, CAST(N'2022-02-17T12:11:06.237' AS DateTime), CAST(N'2022-02-17T12:11:06.237' AS DateTime), N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', NULL)
INSERT [dbo].[Profile] ([ID], [Code], [ProjectMissionID], [WorkUnitID], [DepartmentID], [VehicleID], [StatusProfileID], [Description], [ExpirationDate], [CreateDate], [UpdateDate], [EmployeeCreateID], [ApproverID]) VALUES (N'e9b87342-4d36-0644-ba6d-b4966e835183', N'HS20220200002', NULL, NULL, NULL, NULL, 1, NULL, NULL, CAST(N'2022-02-17T12:12:04.150' AS DateTime), CAST(N'2022-02-20T18:55:04.500' AS DateTime), N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', NULL)
INSERT [dbo].[Profile] ([ID], [Code], [ProjectMissionID], [WorkUnitID], [DepartmentID], [VehicleID], [StatusProfileID], [Description], [ExpirationDate], [CreateDate], [UpdateDate], [EmployeeCreateID], [ApproverID]) VALUES (N'44fc59cd-8d69-43a7-9036-1ccbad8bc8ed', N'HS20211200003', 3, 1, NULL, NULL, 1, NULL, NULL, CAST(N'2021-12-31T14:03:36.053' AS DateTime), CAST(N'2022-02-17T11:48:30.330' AS DateTime), N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', N'50e2b612-937f-dc46-9d27-5e3ab7674ea8')
INSERT [dbo].[Profile] ([ID], [Code], [ProjectMissionID], [WorkUnitID], [DepartmentID], [VehicleID], [StatusProfileID], [Description], [ExpirationDate], [CreateDate], [UpdateDate], [EmployeeCreateID], [ApproverID]) VALUES (N'82a2b5c1-ccce-7d44-af42-fc648bdb4ad7', N'HS20220200003', NULL, NULL, NULL, NULL, 1, NULL, NULL, CAST(N'2022-02-17T12:32:45.187' AS DateTime), CAST(N'2022-02-17T14:10:58.593' AS DateTime), N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', NULL)
GO
SET IDENTITY_INSERT [dbo].[ProjectMission] ON 

INSERT [dbo].[ProjectMission] ([ID], [Name], [Description], [WorkUnitCreateID], [EmployeeID], [CreateDate], [UpdateDate]) VALUES (2, N'Test 1', N'<p>sdfsfsdfsd</p>', 1, N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', CAST(N'2022-02-06T15:47:11.003' AS DateTime), CAST(N'2022-02-15T07:23:14.250' AS DateTime))
INSERT [dbo].[ProjectMission] ([ID], [Name], [Description], [WorkUnitCreateID], [EmployeeID], [CreateDate], [UpdateDate]) VALUES (3, N'Test 2', N'<p>Chi tiết công việc, nhiệm vụ</p>', 1, N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', CAST(N'2022-02-06T15:50:51.853' AS DateTime), CAST(N'2022-02-15T07:23:32.293' AS DateTime))
INSERT [dbo].[ProjectMission] ([ID], [Name], [Description], [WorkUnitCreateID], [EmployeeID], [CreateDate], [UpdateDate]) VALUES (5, N'Thêm mới công việc, nhiệm vụ', N'<p>Thêm mới công việc, nhiệm vụ</p>', 1, N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', CAST(N'2022-02-06T17:54:29.243' AS DateTime), CAST(N'2022-02-06T17:54:29.243' AS DateTime))
SET IDENTITY_INSERT [dbo].[ProjectMission] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1, N'ROLE_ADMIN', CAST(N'2022-02-02T14:59:27.650' AS DateTime), CAST(N'2022-02-11T09:41:32.760' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (2, N'ROLE_CUSTOMER', CAST(N'2022-02-02T14:59:27.650' AS DateTime), CAST(N'2022-02-06T15:31:41.727' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1046, N'TEST1', CAST(N'2022-02-03T14:49:24.450' AS DateTime), CAST(N'2022-02-03T15:29:11.650' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1047, N'dev1', CAST(N'2022-02-03T15:33:48.253' AS DateTime), CAST(N'2022-02-03T15:43:23.387' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1049, N'dev1234', CAST(N'2022-02-03T16:44:05.923' AS DateTime), CAST(N'2022-02-03T16:44:05.923' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1045, N'Test+', CAST(N'2022-02-03T14:12:29.963' AS DateTime), CAST(N'2022-02-03T16:35:38.993' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1048, N'dev123', CAST(N'2022-02-03T16:36:19.020' AS DateTime), CAST(N'2022-02-03T16:36:19.020' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1050, N'dev12345', CAST(N'2022-02-03T16:53:25.573' AS DateTime), CAST(N'2022-02-03T16:54:39.947' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1053, N'vai trò', CAST(N'2022-02-03T21:26:05.647' AS DateTime), CAST(N'2022-02-03T21:26:05.647' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1054, N'TEST_12345', CAST(N'2022-02-03T21:28:21.520' AS DateTime), CAST(N'2022-02-03T21:28:21.520' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1055, N'ROLE_TEST_TEST', CAST(N'2022-02-03T21:30:15.123' AS DateTime), CAST(N'2022-02-03T21:30:15.123' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1056, N'L_TEST', CAST(N'2022-02-03T21:39:13.250' AS DateTime), CAST(N'2022-02-03T21:39:13.250' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1057, N'L_TEST_1', CAST(N'2022-02-03T21:41:34.020' AS DateTime), CAST(N'2022-02-03T21:41:34.020' AS DateTime))
INSERT [dbo].[Role] ([ID], [Name], [CreateDate], [UpdateDate]) VALUES (1058, N'L_TEST_2', CAST(N'2022-02-03T21:43:20.927' AS DateTime), CAST(N'2022-02-03T21:43:20.927' AS DateTime))
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[StatusProfile] ON 

INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (1, N'Đã hủy', N'Hò sơ đã bị hủy')
INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (2, N'ĐÃ hết hạn', N'Hồ sơ đã hết hạn')
INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (3, N'Đã hủy', N'Hò sơ đã bị hủy')
INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (4, N'ĐÃ được duyệt', N'Hồ sơ đã duyệt')
INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (5, N'Đã hủy', N'Hò sơ đã bị hủy')
INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (6, N'Đã hủy', N'Hò sơ đã bị hủy')
INSERT [dbo].[StatusProfile] ([ID], [Name], [Description]) VALUES (7, N'Đã hủy', N'Hò sơ đã bị hủy')
SET IDENTITY_INSERT [dbo].[StatusProfile] OFF
GO
SET IDENTITY_INSERT [dbo].[SysUser] ON 

INSERT [dbo].[SysUser] ([ID], [Username], [Password], [EmployeeID], [IsActive], [CreateDate], [UpdateDate], [RoleID]) VALUES (1, N'lau', N'$2a$10$hovPen.uVZAzPlFy.YwWcOFurfRhAufbSwjkVEr60R8brdpL9Uv7m', N'e2e650db-1a7e-be47-a94b-f7e9ace9d8ca', 1, NULL, CAST(N'2022-02-04T18:43:04.033' AS DateTime), 2)
INSERT [dbo].[SysUser] ([ID], [Username], [Password], [EmployeeID], [IsActive], [CreateDate], [UpdateDate], [RoleID]) VALUES (6, N'dev_v1', N'', N'2ce76cd6-18d0-1845-ae20-47b3ae99b2c0', 0, CAST(N'2022-02-04T18:36:43.660' AS DateTime), CAST(N'2022-02-11T09:39:34.947' AS DateTime), 2)
INSERT [dbo].[SysUser] ([ID], [Username], [Password], [EmployeeID], [IsActive], [CreateDate], [UpdateDate], [RoleID]) VALUES (3, N'dev', N'$2a$10$fsgcoJgbvxyEjvLfS9IzpuQ1e1C7jZpsrYDSG/2d8Z49iWywOIeBu', N'30301aa5-6ea5-0f4a-a848-4910d05662e4', 1, CAST(N'2022-02-04T17:12:25.750' AS DateTime), CAST(N'2022-02-04T17:12:25.870' AS DateTime), 1045)
INSERT [dbo].[SysUser] ([ID], [Username], [Password], [EmployeeID], [IsActive], [CreateDate], [UpdateDate], [RoleID]) VALUES (7, N'public', N'$2a$10$CBxQfvKlgxAuDXvd0uVCJeU27tYlAskyoMWdZujr7B0TpY0chtY.6', N'50e2b612-937f-dc46-9d27-5e3ab7674ea8', 1, CAST(N'2022-02-06T10:42:13.597' AS DateTime), CAST(N'2022-02-15T06:21:17.123' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[SysUser] OFF
GO
SET IDENTITY_INSERT [dbo].[SysUserAdmin] ON 

INSERT [dbo].[SysUserAdmin] ([ID], [Username], [Password], [CreateDate], [UpdateDate], [RoleID]) VALUES (1, N'nghiahd', N'$2a$10$PZoaL4TlCUFeUDer4isOmuom0z9tDvqp8YeJS07nAubs2xV9H022a', CAST(N'2021-12-19T18:23:09.967' AS DateTime), CAST(N'2021-12-19T18:23:09.967' AS DateTime), 1)
INSERT [dbo].[SysUserAdmin] ([ID], [Username], [Password], [CreateDate], [UpdateDate], [RoleID]) VALUES (2, N'devtest', N'$2a$10$GxWVDrscRWyVd4r7BEnjHeJKz9RgxiQOyRDEK8vZcCFJ1TWA.OXjO', CAST(N'2022-01-22T22:30:03.480' AS DateTime), CAST(N'2022-01-22T22:30:03.480' AS DateTime), NULL)
INSERT [dbo].[SysUserAdmin] ([ID], [Username], [Password], [CreateDate], [UpdateDate], [RoleID]) VALUES (3, N'dev1', N'$2a$10$uWl4mZEuXz3eS3oFIIWs8uF.9LVowkDowutd/Zz1.1gdMmAw3fNzS', CAST(N'2022-01-22T22:31:27.043' AS DateTime), CAST(N'2022-01-22T22:31:27.043' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[SysUserAdmin] OFF
GO
INSERT [dbo].[UnitType] ([ID], [Name]) VALUES (1, N'Bộ')
INSERT [dbo].[UnitType] ([ID], [Name]) VALUES (2, N'Cục')
INSERT [dbo].[UnitType] ([ID], [Name]) VALUES (3, N'Đơn vị cơ sở')
GO
SET IDENTITY_INSERT [dbo].[Vehicle] ON 

INSERT [dbo].[Vehicle] ([ID], [Name]) VALUES (1, N'Ô tô')
INSERT [dbo].[Vehicle] ([ID], [Name]) VALUES (2, N'Xe máy')
INSERT [dbo].[Vehicle] ([ID], [Name]) VALUES (3, N'Thuyền')
SET IDENTITY_INSERT [dbo].[Vehicle] OFF
GO
SET IDENTITY_INSERT [dbo].[WorkUnit] ON 

INSERT [dbo].[WorkUnit] ([ID], [Name], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [UnitTypeID], [LocationID]) VALUES (1, N'Đơn vị A', NULL, NULL, NULL, NULL, 3, NULL)
INSERT [dbo].[WorkUnit] ([ID], [Name], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [UnitTypeID], [LocationID]) VALUES (2, N'Đơn vị B', NULL, NULL, NULL, NULL, 3, NULL)
SET IDENTITY_INSERT [dbo].[WorkUnit] OFF
GO
/****** Object:  Index [TaskForDepartment_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[AssignTasks] ADD  CONSTRAINT [TaskForDepartment_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [CityProvince_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[CityProvince] ADD  CONSTRAINT [CityProvince_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Comment_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Comment] ADD  CONSTRAINT [Comment_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [CommuneWard_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[CommuneWard] ADD  CONSTRAINT [CommuneWard_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Country_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Country] ADD  CONSTRAINT [Country_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Department_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [Department_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [District_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[District] ADD  CONSTRAINT [District_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Employee_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Employee] ADD  CONSTRAINT [Employee_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [EmployeeInProfile_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[EmployeeInProfile] ADD  CONSTRAINT [EmployeeInProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[EmployeeID] ASC,
	[ProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Experts_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Experts] ADD  CONSTRAINT [Experts_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ExpertsInProfile_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[ExpertsInProfile] ADD  CONSTRAINT [ExpertsInProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ExpertsID] ASC,
	[ProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Location_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [Location_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Module_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Module] ADD  CONSTRAINT [Module_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ObjectType_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[ObjectType] ADD  CONSTRAINT [ObjectType_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Permission_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Permission] ADD  CONSTRAINT [Permission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PermissionRole_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[PermissionRole] ADD  CONSTRAINT [PermissionRole_pk] PRIMARY KEY NONCLUSTERED 
(
	[PermissionID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Position_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Position] ADD  CONSTRAINT [Position_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Profile_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Profile] ADD  CONSTRAINT [Profile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ProjectMission_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[ProjectMission] ADD  CONSTRAINT [ProjectMission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Role_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [Role_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [StatusProfile_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[StatusProfile] ADD  CONSTRAINT [StatusProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUser_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[SysUser] ADD  CONSTRAINT [SysUser_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUserAdmin_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[SysUserAdmin] ADD  CONSTRAINT [SysUserAdmin_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UnitType_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[UnitType] ADD  CONSTRAINT [UnitType_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Vehicle_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[Vehicle] ADD  CONSTRAINT [Vehicle_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [WorkUnit_pk]    Script Date: 2/21/2022 11:23:12 AM ******/
ALTER TABLE [dbo].[WorkUnit] ADD  CONSTRAINT [WorkUnit_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT (getdate()) FOR [CreateDate]
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT (getdate()) FOR [UpdateDate]
GO
/****** Object:  Trigger [dbo].[genCodeEmployee]    Script Date: 2/21/2022 11:23:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE trigger [dbo].[genCodeEmployee]
    on [dbo].[Employee]
    instead of insert
    as
    begin
        SET NOCOUNT ON;
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


--         insert into dbo.Employee(ID, Code, FullName, Avatar, Gender, BirthDay, CityProvinceID, DistrictID,
--                          CommuneWardID, Description, PhoneNumber, NumberIdentityCard, CreateDate, UpdateDate,
--                          DepartmentID, PositionID, WorkUnitID, UnitTypeID)
--         select ID,
--                [dbo].getCode('NV', concat(@year, @month), @count + tb.rowNum) as Code,
--                FullName,
--                Avatar,
--                Gender,
--                BirthDay,
--                CityProvinceID,
--                DistrictID,
--                CommuneWardID,
--                Description,
--                PhoneNumber,
--                NumberIdentityCard,
--                CreateDate,
--                UpdateDate,
--                DepartmentID,
--                PositionID,
--                WorkUnitID,
--                UnitTypeID
--         FROM inserted ins
--                  INNER JOIN @tbCode tb ON ins.id = tb.idRef

        insert into dbo.Employee
        select ins.*
        FROM inserted ins

        update dbo.Employee
        set Code = [dbo].getCode('NV', concat(@year, @month), @count + tb.rowNum)
        FROM @tbCode tb
                 INNER JOIN dbo.Employee as e ON e.id = tb.idRef
    end;
GO
ALTER TABLE [dbo].[Employee] ENABLE TRIGGER [genCodeEmployee]
GO
/****** Object:  Trigger [dbo].[genCodeExperts]    Script Date: 2/21/2022 11:23:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create trigger [dbo].[genCodeExperts]
    on [dbo].[Experts]
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
GO
ALTER TABLE [dbo].[Experts] ENABLE TRIGGER [genCodeExperts]
GO
/****** Object:  Trigger [dbo].[genCodeProfile]    Script Date: 2/21/2022 11:23:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create trigger [dbo].[genCodeProfile]
    on [dbo].[Profile]
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
GO
ALTER TABLE [dbo].[Profile] ENABLE TRIGGER [genCodeProfile]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'phân công nhi?m v?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'AssignTasks'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N' T?nh, Thành ph?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CityProvince'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nh?n xét h? so' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Comment'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Phu?ng xã' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CommuneWard'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Qu?c gia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Country'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'phòng ban' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Department'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Qu?n huy?n' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'District'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nhân viên, nhân s?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Employee'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nhân viên tham gia cùng chuyên gia trong h? so' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'EmployeeInProfile'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Chuyên gia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Experts'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'các chuyên gia trong h? so' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ExpertsInProfile'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'các module c?a h? th?ng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Quy?n h?n chi ti?t v?i t?ng danh m?c module (thêm, s?a, xóa)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Permission'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'quy?n h?n v?i t?ng vai trò' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PermissionRole'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Ch?c v?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'h? so công vi?c nh?p c?nh c?a chuyên gia' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Profile'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nhi?m v?, công vi?c' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProjectMission'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Vai trò' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'tr?ng thái h? so' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'StatusProfile'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'H? th?ng tài kho?n ngu?i dùng (public)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Hệ thống tài khoản quản trị viên' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserAdmin'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Lo?i don v? (1: B? , 2 : C?c, 3: Ðon v? co s? )' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UnitType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N' Phuong ti?n giao thông v?n chuy?n' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Vehicle'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'don v? công tác' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'WorkUnit'
GO
