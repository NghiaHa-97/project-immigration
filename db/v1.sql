USE [db_do_an]
GO
/****** Object:  Table [dbo].[CityProvince]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CityProvince](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[CommuneWard]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[Country]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[District]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[Employee]    Script Date: 12/22/2021 9:46:18 PM ******/
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
	[DepartmentID] [uniqueidentifier] NULL,
	[PositionID] [uniqueidentifier] NULL,
	[WorkUnitID] [uniqueidentifier] NULL,
	[CityProvinceID] [int] NULL,
	[DistrictID] [int] NULL,
	[CommuneWardID] [int] NULL,
	[Description] [nvarchar](512) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[NumberIdentityCard] [nvarchar](50) NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeInProfile]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeInProfile](
	[EmployeeID] [uniqueidentifier] NOT NULL,
	[ProfileID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experts]    Script Date: 12/22/2021 9:46:18 PM ******/
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
	[DATETIME] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExpertsInProfile]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpertsInProfile](
	[ExpertsID] [uniqueidentifier] NOT NULL,
	[ProfileID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[Permission]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[PermissionRole]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionRole](
	[PermissionID] [int] NOT NULL,
	[RoleID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Position]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Position](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 12/22/2021 9:46:18 PM ******/
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
	[UpdateDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectMission]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectMission](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](512) NULL,
	[Description] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusProfile]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[SysUser]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[SysUserAdmin]    Script Date: 12/22/2021 9:46:18 PM ******/
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
/****** Object:  Table [dbo].[TaskForAssistant]    Script Date: 12/22/2021 9:46:18 PM ******/
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
	[ExpirationDate] [date] NULL,
	[CreateDate] [date] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaskForDepartment]    Script Date: 12/22/2021 9:46:18 PM ******/
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
	[ExpirationDate] [date] NULL,
	[CreateDate] [date] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UnitType]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnitType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicle]    Script Date: 12/22/2021 9:46:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicle](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkUnit]    Script Date: 12/22/2021 9:46:18 PM ******/
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
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (1, N'Module_1', 1)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (2, N'Module_2', 2)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (3, N'Module_3', 3)
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
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([ID], [Name]) VALUES (1, N'ROLE_ADMIN')
INSERT [dbo].[Role] ([ID], [Name]) VALUES (2, N'ROLE_CUSTOMER')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[SysUserAdmin] ON 

INSERT [dbo].[SysUserAdmin] ([ID], [Username], [Password], [CreateDate], [UpdateDate], [RoleID]) VALUES (1, N'nghiahd', N'$2a$10$PZoaL4TlCUFeUDer4isOmuom0z9tDvqp8YeJS07nAubs2xV9H022a', CAST(N'2021-12-19T18:23:09.967' AS DateTime), CAST(N'2021-12-19T18:23:09.967' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[SysUserAdmin] OFF
GO
/****** Object:  Index [CityProvince_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[CityProvince] ADD  CONSTRAINT [CityProvince_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Comment_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[Comment] ADD  CONSTRAINT [Comment_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [CommuneWard_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[CommuneWard] ADD  CONSTRAINT [CommuneWard_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Country_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[Country] ADD  CONSTRAINT [Country_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Department_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [Department_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [District_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[District] ADD  CONSTRAINT [District_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Employee_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[Employee] ADD  CONSTRAINT [Employee_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [EmployeeInProfile_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[EmployeeInProfile] ADD  CONSTRAINT [EmployeeInProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[EmployeeID] ASC,
	[ProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Experts_pk]    Script Date: 12/22/2021 9:46:18 PM ******/
ALTER TABLE [dbo].[Experts] ADD  CONSTRAINT [Experts_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ExpertsInProfile_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[ExpertsInProfile] ADD  CONSTRAINT [ExpertsInProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ExpertsID] ASC,
	[ProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Module_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[Module] ADD  CONSTRAINT [Module_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Permission_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[Permission] ADD  CONSTRAINT [Permission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PermissionRole_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[PermissionRole] ADD  CONSTRAINT [PermissionRole_pk] PRIMARY KEY NONCLUSTERED 
(
	[PermissionID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Position_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[Position] ADD  CONSTRAINT [Position_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Profile_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[Profile] ADD  CONSTRAINT [Profile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ProjectMission_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[ProjectMission] ADD  CONSTRAINT [ProjectMission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Role_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [Role_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [StatusProfile_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[StatusProfile] ADD  CONSTRAINT [StatusProfile_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUser_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[SysUser] ADD  CONSTRAINT [SysUser_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUserAdmin_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[SysUserAdmin] ADD  CONSTRAINT [SysUserAdmin_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [TaskForAssistant_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[TaskForAssistant] ADD  CONSTRAINT [TaskForAssistant_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [TaskForDepartment_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[TaskForDepartment] ADD  CONSTRAINT [TaskForDepartment_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UnitType_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[UnitType] ADD  CONSTRAINT [UnitType_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Vehicle_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[Vehicle] ADD  CONSTRAINT [Vehicle_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [WorkUnit_pk]    Script Date: 12/22/2021 9:46:19 PM ******/
ALTER TABLE [dbo].[WorkUnit] ADD  CONSTRAINT [WorkUnit_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
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
