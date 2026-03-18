<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('password')
                    ->password()
                    ->dehydrated(fn($state) => filled($state))
                    ->required(fn(string $context): bool => $context === 'create'),
                \Filament\Forms\Components\Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name')
                    ->preload(),
                \Filament\Forms\Components\Select::make('institution_id')
                    ->relationship('institution', 'name')
                    ->searchable()
                    ->preload(),
                TextInput::make('country'),
                TextInput::make('phone')
                    ->tel(),
                \Filament\Forms\Components\FileUpload::make('profile_image')
                    ->image()
                    ->directory('profile-images'),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'Active' => 'Active',
                        'Pending' => 'Pending',
                        'Suspended' => 'Suspended',
                    ])
                    ->default('Active')
                    ->required(),
            ]);
    }
}
