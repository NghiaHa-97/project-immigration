USE [db_do_an]
GO
/****** Object:  UserDefinedFunction [dbo].[getCode]    Script Date: 1/2/2022 9:17:07 AM ******/
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
/****** Object:  Table [dbo].[CityProvince]    Script Date: 1/2/2022 9:17:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CityProvince](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[ID] [uniqueidentifier] NOT NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[ProfileID] [uniqueidentifier] NULL,
	[WorkUnitID] [int] NULL,
	[Status] [int] NULL,
	[Reason] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommuneWard]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[Country]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[District]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[Employee]    Script Date: 1/2/2022 9:17:08 AM ******/
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
	[WorkUnitID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeInProfile]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeInProfile](
	[EmployeeID] [uniqueidentifier] NOT NULL,
	[ProfileID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experts]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[ExpertsInProfile]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpertsInProfile](
	[ExpertsID] [uniqueidentifier] NOT NULL,
	[ProfileID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[Permission]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[PermissionRole]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionRole](
	[PermissionID] [int] NOT NULL,
	[RoleID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Position]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[Profile]    Script Date: 1/2/2022 9:17:08 AM ******/
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
	[ApproverID] [uniqueidentifier] NULL,
	[UnitCreateProfileID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectMission]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectMission](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](512) NULL,
	[Description] [nvarchar](max) NULL,
	[WorkUnitCreateID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusProfile]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[SysUser]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[SysUserAdmin]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Table [dbo].[TaskForAssistant]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskForAssistant](
	[ID] [uniqueidentifier] NOT NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[ProfileID] [uniqueidentifier] NULL,
	[Description] [nvarchar](max) NULL,
	[Result] [nvarchar](max) NULL,
	[ExpirationDate] [datetime] NULL,
	[CreateDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaskForDepartment]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskForDepartment](
	[ID] [uniqueidentifier] NOT NULL,
	[DepartmentID] [int] NULL,
	[ProfileID] [uniqueidentifier] NULL,
	[Description] [nvarchar](max) NULL,
	[Result] [nvarchar](max) NULL,
	[ExpirationDate] [datetime] NULL,
	[CreateDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UnitType]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnitType](
	[ID] [int] NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkUnit]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkUnit](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](512) NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
	[CityProvinceID] [int] NULL,
	[DistrictID] [int] NULL,
	[CommuneWardID] [int] NULL,
	[Description] [nvarchar](512) NULL,
	[UnitTypeID] [int] NULL
) ON [PRIMARY]
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
SET IDENTITY_INSERT [dbo].[District] ON 

INSERT [dbo].[District] ([ID], [Name], [CityProvinceID]) VALUES (1, N'Nam Từ Niêm', 1)
INSERT [dbo].[District] ([ID], [Name], [CityProvinceID]) VALUES (2, N'Mê Linh', 1)
SET IDENTITY_INSERT [dbo].[District] OFF
GO
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID]) VALUES (N'540fd15a-d937-4b9e-be36-9db7438e953c', N'NV20211200001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-31T20:03:21.720' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID]) VALUES (N'cfd8758c-9e50-4b1d-adca-cf2b24c627eb', N'NV20211200002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-31T20:03:21.720' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([ID], [Code], [FullName], [Avatar], [Gender], [BirthDay], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [PhoneNumber], [NumberIdentityCard], [CreateDate], [UpdateDate], [DepartmentID], [PositionID], [WorkUnitID]) VALUES (N'3230f6f1-582a-4ba6-a255-e7ef05256788', N'NV20211200003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-31T20:03:23.403' AS DateTime), NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'38507b51-65b9-4644-bb58-1dbdc1316db0', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'38507b51-65b9-4644-bb58-1dbdc1316db0', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'6c249eba-5680-4730-bdc1-6491ab42dcf7', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'ef9389da-1a90-477d-bb8e-ae3c2c6cbe25', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'ef9389da-1a90-477d-bb8e-ae3c2c6cbe25', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'48868357-bedc-494a-bf75-b91e3f56eed8', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'e87c923b-c9c1-4883-8045-cbed40591c76', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[EmployeeInProfile] ([EmployeeID], [ProfileID]) VALUES (N'e87c923b-c9c1-4883-8045-cbed40591c76', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
GO
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'cb771544-d4e9-4e42-a3d7-e12c59503ade', N'CG20211200001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-28T16:59:16.587' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'b59d31fe-d554-4086-841a-9df6f58d67f4', N'CG20211200002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-28T16:59:16.587' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'7208c60c-aaac-4acd-a292-ed365bd152ab', N'CG20211200003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-30T13:15:39.003' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'a2caac7c-1be8-429b-955d-6f728ce7d753', N'CG20211200004', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-30T13:15:39.003' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'8ee8f030-53f1-4c00-ba8d-a409482a9e6a', N'CG20211200005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-30T13:15:45.230' AS DateTime), NULL)
INSERT [dbo].[Experts] ([ID], [Code], [FullName], [Gender], [BirthDay], [CountryID], [Religion], [Occupation], [PermanentResidentialAddress], [PhoneNumber], [PassportNumber], [ExpiryDate], [DateOfEntry], [LengthOfStay], [PassportImage], [PortraitPhotography], [CreateDate], [updatedate]) VALUES (N'009cd1cc-8a6a-48d7-b5db-01fc1f3ed6dc', N'CG20211200006', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-30T13:15:45.230' AS DateTime), NULL)
GO
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID]) VALUES (N'a2caac7c-1be8-429b-955d-6f728ce7d753', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID]) VALUES (N'b59d31fe-d554-4086-841a-9df6f58d67f4', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID]) VALUES (N'b59d31fe-d554-4086-841a-9df6f58d67f4', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID]) VALUES (N'cb771544-d4e9-4e42-a3d7-e12c59503ade', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID]) VALUES (N'cb771544-d4e9-4e42-a3d7-e12c59503ade', N'ef9ebdc7-d261-4eb5-8b8c-7dfa0e40a03c')
INSERT [dbo].[ExpertsInProfile] ([ExpertsID], [ProfileID]) VALUES (N'7208c60c-aaac-4acd-a292-ed365bd152ab', N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8')
GO
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (33, N'nghia', 1)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (55, N'nghia', 1)
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
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1)
GO
INSERT [dbo].[Profile] ([ID], [Code], [ProjectMissionID], [WorkUnitID], [DepartmentID], [VehicleID], [StatusProfileID], [Description], [ExpirationDate], [CreateDate], [UpdateDate], [EmployeeCreateID], [ApproverID], [UnitCreateProfileID]) VALUES (N'43d1fff7-b7d9-424d-8e9e-27c14a05ecb8', N'HS20211200001', NULL, NULL, NULL, NULL, NULL, N'Thành Công', NULL, CAST(N'2021-12-28T16:59:19.457' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[Profile] ([ID], [Code], [ProjectMissionID], [WorkUnitID], [DepartmentID], [VehicleID], [StatusProfileID], [Description], [ExpirationDate], [CreateDate], [UpdateDate], [EmployeeCreateID], [ApproverID], [UnitCreateProfileID]) VALUES (N'44fc59cd-8d69-43a7-9036-1ccbad8bc8ed', N'HS20211200003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-12-31T14:03:36.053' AS DateTime), NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([ID], [Name]) VALUES (1, N'ROLE_ADMIN')
INSERT [dbo].[Role] ([ID], [Name]) VALUES (2, N'ROLE_CUSTOMER')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[SysUserAdmin] ON 

INSERT [dbo].[SysUserAdmin] ([ID], [Username], [Password], [CreateDate], [UpdateDate], [RoleID]) VALUES (1, N'nghiahd', N'$2a$10$PZoaL4TlCUFeUDer4isOmuom0z9tDvqp8YeJS07nAubs2xV9H022a', CAST(N'2021-12-19T18:23:09.967' AS DateTime), CAST(N'2021-12-19T18:23:09.967' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[SysUserAdmin] OFF
GO
INSERT [dbo].[UnitType] ([ID], [Name]) VALUES (1, N'Bộ')
INSERT [dbo].[UnitType] ([ID], [Name]) VALUES (2, N'Cục')
INSERT [dbo].[UnitType] ([ID], [Name]) VALUES (3, N'Đơn vị cơ sở')
GO
SET IDENTITY_INSERT [dbo].[WorkUnit] ON 

INSERT [dbo].[WorkUnit] ([ID], [Name], [Latitude], [Longitude], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [UnitTypeID]) VALUES (1, N'Đơn vị A', NULL, NULL, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[WorkUnit] ([ID], [Name], [Latitude], [Longitude], [CityProvinceID], [DistrictID], [CommuneWardID], [Description], [UnitTypeID]) VALUES (2, N'Đơn vị B', NULL, NULL, NULL, NULL, NULL, NULL, 3)
SET IDENTITY_INSERT [dbo].[WorkUnit] OFF
GO
/****** Object:  Index [CityProvince_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[CityProvince] ADD  CONSTRAINT [CityProvince_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [CityProvince_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [CityProvince_ID_uindex] ON [dbo].[CityProvince]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Comment_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Comment] ADD  CONSTRAINT [Comment_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Comment_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Comment_ID_uindex] ON [dbo].[Comment]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [CommuneWard_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[CommuneWard] ADD  CONSTRAINT [CommuneWard_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [CommuneWard_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [CommuneWard_ID_uindex] ON [dbo].[CommuneWard]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Country_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Country] ADD  CONSTRAINT [Country_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Country_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Country_ID_uindex] ON [dbo].[Country]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Department_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [Department_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Department_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Department_ID_uindex] ON [dbo].[Department]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [District_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[District] ADD  CONSTRAINT [District_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [District_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [District_ID_uindex] ON [dbo].[District]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Employee_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Employee] ADD  CONSTRAINT [Employee_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Employee_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Employee_ID_uindex] ON [dbo].[Employee]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [EmployeeInProfile_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[EmployeeInProfile] ADD  CONSTRAINT [EmployeeInProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[EmployeeID] ASC,
	[ProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Experts_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Experts] ADD  CONSTRAINT [Experts_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Experts_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Experts_ID_uindex] ON [dbo].[Experts]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ExpertsInProfile_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[ExpertsInProfile] ADD  CONSTRAINT [ExpertsInProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ExpertsID] ASC,
	[ProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Module_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Module] ADD  CONSTRAINT [Module_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Permission_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Permission] ADD  CONSTRAINT [Permission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Permission_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Permission_ID_uindex] ON [dbo].[Permission]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PermissionRole_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[PermissionRole] ADD  CONSTRAINT [PermissionRole_pk] PRIMARY KEY NONCLUSTERED 
(
	[PermissionID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Position_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Position] ADD  CONSTRAINT [Position_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Position_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Position_ID_uindex] ON [dbo].[Position]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Profile_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Profile] ADD  CONSTRAINT [Profile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Profile_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Profile_ID_uindex] ON [dbo].[Profile]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ProjectMission_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[ProjectMission] ADD  CONSTRAINT [ProjectMission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ProjectMission_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ProjectMission_ID_uindex] ON [dbo].[ProjectMission]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Role_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [Role_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Role_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Role_ID_uindex] ON [dbo].[Role]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [StatusProfile_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[StatusProfile] ADD  CONSTRAINT [StatusProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [StatusProfile_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [StatusProfile_ID_uindex] ON [dbo].[StatusProfile]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUser_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[SysUser] ADD  CONSTRAINT [SysUser_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUser_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [SysUser_ID_uindex] ON [dbo].[SysUser]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUserAdmin_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[SysUserAdmin] ADD  CONSTRAINT [SysUserAdmin_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUserAdmin_ ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [SysUserAdmin_ ID_uindex] ON [dbo].[SysUserAdmin]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [TaskForAssistant_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[TaskForAssistant] ADD  CONSTRAINT [TaskForAssistant_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [TaskForAssistant_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TaskForAssistant_ID_uindex] ON [dbo].[TaskForAssistant]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [TaskForDepartment_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[TaskForDepartment] ADD  CONSTRAINT [TaskForDepartment_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [TaskForDepartment_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TaskForDepartment_ID_uindex] ON [dbo].[TaskForDepartment]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UnitType_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[UnitType] ADD  CONSTRAINT [UnitType_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UnitType_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UnitType_ID_uindex] ON [dbo].[UnitType]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Vehicle_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[Vehicle] ADD  CONSTRAINT [Vehicle_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Vehicle_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Vehicle_ID_uindex] ON [dbo].[Vehicle]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [WorkUnit_pk]    Script Date: 1/2/2022 9:17:08 AM ******/
ALTER TABLE [dbo].[WorkUnit] ADD  CONSTRAINT [WorkUnit_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [WorkUnit_ID_uindex]    Script Date: 1/2/2022 9:17:08 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [WorkUnit_ID_uindex] ON [dbo].[WorkUnit]
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Trigger [dbo].[genCodeEmployee]    Script Date: 1/2/2022 9:17:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE trigger [dbo].[genCodeEmployee]
    on [dbo].[Employee]
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
GO
ALTER TABLE [dbo].[Employee] ENABLE TRIGGER [genCodeEmployee]
GO
/****** Object:  Trigger [dbo].[genCodeExperts]    Script Date: 1/2/2022 9:17:08 AM ******/
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
/****** Object:  Trigger [dbo].[genCodeProfile]    Script Date: 1/2/2022 9:17:08 AM ******/
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Phân công nhi?m v? cho tr? lý' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TaskForAssistant'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'phân công nhi?m v? cho phòng ban' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TaskForDepartment'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Lo?i don v? (1: B? , 2 : C?c, 3: Ðon v? co s? )' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UnitType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N' Phuong ti?n giao thông v?n chuy?n' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Vehicle'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'don v? công tác' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'WorkUnit'
GO
